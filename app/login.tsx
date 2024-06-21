import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import firebase from "@/FirebaseConfig";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [rememberMe, setRememberMe] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        router.replace("/dashboard"); // Navigate to the main app screen
      }
    });
    return () => {
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const loadStoredUsername = async () => {
      try {
        const storedLoginInfo = await AsyncStorage.getItem("lastLoginInfo");
        if (storedLoginInfo) {
          const { emailAddress, password, rememberMe: storedRememberMe } = JSON.parse(storedLoginInfo);
          setEmailAddress(emailAddress);
          setPassword(password);
          setRememberMe(storedRememberMe);
        }
      } catch (error) {
        console.error("Error loading stored login information:", error);
      }
    };
    loadStoredUsername();
  }, []);

  const loginUser = async () => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      if (rememberMe) {
        saveLoginInfo();
      } else {
        await AsyncStorage.removeItem("lastLoginInfo");
      }
      router.replace("/dashboard"); // Navigate to the main app screen
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);
      if (rememberMe) {
        saveLoginInfo();
      } else {
        await AsyncStorage.removeItem("lastLoginInfo");
      }
      router.replace("/dashboard"); // Navigate to the main app screen
    } catch (error: any) {
      Alert.alert("Registration Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveLoginInfo = async () => {
    try {
      await AsyncStorage.setItem("lastLoginInfo", JSON.stringify({ emailAddress, password, rememberMe }));
    } catch (error) {
      console.error("Error saving login information to AsyncStorage:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={styles.title}>
        {type === "login" ? "Welcome back" : "Create your account"}
      </Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
      </View>

      {type === "login" ? (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={loginUser}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={createUser}
        >
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
    width: 350,
  },
  btnPrimary: {
    backgroundColor: Colors.grey,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;