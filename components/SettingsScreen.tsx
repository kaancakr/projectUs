import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SettingsScreen: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
