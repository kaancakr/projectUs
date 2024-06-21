import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OpeningScreen = () => {
  const logoFlex = useSharedValue(1);
  const logoOpacity = useSharedValue(1);
  const sheetOpacity = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      logoFlex.value = withTiming(0.6, { duration: 500 });
      logoOpacity.value = withTiming(0.6, { duration: 500 });
      sheetOpacity.value = withTiming(1, { duration: 500 });
    }, 3000);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      flex: logoFlex.value,
      opacity: logoOpacity.value,
    };
  });

  const animatedBottomSheetStyle = useAnimatedStyle(() => {
    return {
      flex: 1 - logoFlex.value,
      opacity: sheetOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Image
          source={require("../assets/images/projectUS.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bottomSheet,
          animatedBottomSheetStyle,
          { paddingBottom: bottom },
        ]}
      >
        <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
          <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
          <Text style={styles.btnLightText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
          <Ionicons
            name="logo-google"
            size={16}
            style={styles.btnIcon}
            color={"#fff"}
          />
          <Text style={styles.btnDarkText}>Continue with Google</Text>
        </TouchableOpacity>
        <Link
          href={{
            pathname: "/login",
            params: { type: "register" },
          }}
          style={[defaultStyles.btn, styles.btnDark]}
          asChild
        >
          <TouchableOpacity>
            <Ionicons
              name="mail"
              size={20}
              style={styles.btnIcon}
              color={"#fff"}
            />
            <Text style={styles.btnDarkText}>Sign up with email</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={{
            pathname: "/login",
            params: { type: "login" },
          }}
          style={[defaultStyles.btn, styles.btnOutline]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.btnDarkText}>Log in</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  bottomSheet: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: "#fff",
  },
  btnLightText: {
    color: "#000",
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});

export default OpeningScreen;
