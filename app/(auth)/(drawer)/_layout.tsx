import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Text,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link, useNavigation, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TextInput } from "react-native-gesture-handler";
import firebase from "@/FirebaseConfig";

const CustomDrawerContent = (props: any) => {
    const router = useRouter();
    const { bottom, top } = useSafeAreaInsets();
    const navigation = useNavigation();
  
    const handleSignOut = async () => {
      try {
        await firebase.auth().signOut();
        router.replace("/login");
      } catch (error) {
        Alert.alert('Error', 'Failed to sign out');
      }
    };
  
    return (
      <View style={{ flex: 1, marginTop: top }}>
        <View style={{ backgroundColor: '#000', paddingBottom: 16 }}>
          <View style={styles.searchSection}>
            <Ionicons style={styles.searchIcon} name="search" size={20} color="#ccc" />
            <TextInput style={styles.input} placeholder="Search" underlineColorAndroid="transparent" placeholderTextColor={'#000'}/>
          </View>
        </View>
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={{ padding: 16, paddingBottom: bottom }}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <Link href="(map)/account" asChild>
            <TouchableOpacity style={styles.footer}>
              <Image source={require('@/assets/images/monkey.jpg')} style={styles.avatar} />
              <Text style={styles.userName}>Kaan Cakir</Text>
              <Ionicons name="ellipsis-horizontal" size={24} color="#ccc" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{
              marginLeft: 16,
            }}
          >
            <FontAwesome6 name="grip-lines" size={20} color={'#fff'} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#000',
          height: 130,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#fff",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        drawerStyle: { width: dimensions.width * 0.86, backgroundColor: '#000' },
        drawerLabelStyle: { marginLeft: -20, fontSize: 16 },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="(map)/dashboard"
        options={{
          title: "Find New Project",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Ionicons name="location" size={25} style={{color: Colors.teal}}/>
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(map)/account" push asChild>
              <TouchableOpacity>
                <Image
                  source={require("@/assets/images/monkey.jpg")}
                  style={styles.topBarAvatar}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="offers"
        options={{
          title: "My Offers",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Ionicons name="bar-chart" size={25} style={{color: Colors.orange}}/>
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(map)/account" push asChild>
              <TouchableOpacity>
                <Image
                  source={require("@/assets/images/monkey.jpg")}
                  style={styles.topBarAvatar}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="(map)/account"
        options={{
          title: "My Account",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Ionicons name="person-circle" size={25} style={{color: Colors.primary}}/>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="wallet"
        options={{
          title: "My Wallet",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Ionicons name="wallet" size={25} style={{color: Colors.blue}}/>
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(map)/account" push asChild>
              <TouchableOpacity>
                <Image
                  source={require("@/assets/images/monkey.jpg")}
                  style={styles.topBarAvatar}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  searchSection: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.input,
    height: 40,
    marginTop: 10
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: "center",
    color: "#424242",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10
  },
  topBarAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    color: '#fff',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    width: 120,
    marginBottom: 20
  },
  signOutText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default Layout;
