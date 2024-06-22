import React from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "../../../../components/MapComponent";

const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;