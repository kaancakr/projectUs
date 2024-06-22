import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import firebase from "@/FirebaseConfig";

type FormState = {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
};

type User = {
  username: string;
};

const Page: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [name, setName] = useState<User>({ username: "" });
  const [newUsername, setNewUsername] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (snapshot.exists) {
          setName(snapshot.data() as User);
        } else {
          console.log("User doesn't exist");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleOpenSettingsScreen = () => {
    navigation.navigate("Settings");
  };

  const handleSaveUsername = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        await firebase.firestore().collection("users").doc(user.uid).update({
          username: newUsername,
        });
        setName({ username: newUsername });
        setModalVisible(false);
        Alert.alert("Success", "Username updated successfully");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert("Error", "Failed to update username");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                source={require("@/assets/images/monkey.jpg")}
                style={styles.profileAvatar}
              />
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>{name.username}</Text>
            <Text style={styles.profileAddress}>Ankara, Çankaya 06000, TR</Text>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter new username"
                value={newUsername}
                onChangeText={setNewUsername}
                style={styles.input}
                autoCapitalize="none"
              />
              <Button title="Save" onPress={handleSaveUsername} />
            </View>
          </View>
        </Modal>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <FeatherIcon color="#fff" name="globe" size={20} />
              </View>
              <Text style={styles.rowLabel}>Language</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>
              <Text style={styles.rowLabel}>Dark Mode</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                value={form.darkMode}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="navigation" size={20} />
              </View>
              <Text style={styles.rowLabel}>Location</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <FeatherIcon color="#fff" name="at-sign" size={20} />
              </View>
              <Text style={styles.rowLabel}>Email Notifications</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
              />
            </View>

            <TouchableOpacity
              onPress={handleOpenSettingsScreen}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#8e8d91" }]}>
                <FeatherIcon color="#fff" name="settings" size={20} />
              </View>
              <Text style={styles.rowLabel}>Settings</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#8e8d91" }]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>
              <Text style={styles.rowLabel}>Report Bug</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>
              <Text style={styles.rowLabel}>Contact Us</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="star" size={20} />
              </View>
              <Text style={styles.rowLabel}>Rate in App Store</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    padding: 24,
    backgroundColor: "#000",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
