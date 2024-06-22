import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import MapView, { Marker } from "react-native-maps";
import Colors from "@/constants/Colors";

type Offer = {
  id: string;
  description: string;
  location: string;
  payment: string;
  latitude: number;
  longitude: number;
};

const Page: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const totalOffers = useSharedValue(0);

  useEffect(() => {
    const fetchedOffers = [
      {
        id: "1",
        description: "Offer 1",
        location: "New York, NY",
        payment: "$100",
        latitude: 40.7128,
        longitude: -74.006,
      },
      {
        id: "2",
        description: "Offer 2",
        location: "Los Angeles, CA",
        payment: "$200",
        latitude: 34.0522,
        longitude: -118.2437,
      },
      {
        id: "3",
        description: "Offer 3",
        location: "Chicago, IL",
        payment: "$150",
        latitude: 41.8781,
        longitude: -87.6298,
      },
    ];
    setOffers(fetchedOffers);

    // Animate total offers count
    totalOffers.value = withTiming(fetchedOffers.length, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const handleAccept = (offerId: string) => {
    Alert.alert("Accepted", `You have accepted offer ${offerId}`);
  };

  const handleDecline = (offerId: string) => {
    Alert.alert("Declined", `You have declined offer ${offerId}`);
  };

  const handleLongPress = (offer: Offer) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: totalOffers.value }],
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={styles.offerContainer}>
              <View style={styles.offerDetails}>
                <Text style={styles.offerDescription}>{item.description}</Text>
                <Text style={styles.offerLocation}>{item.location}</Text>
                <Text style={styles.offerPayment}>{item.payment}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(item.id)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => handleDecline(item.id)}
                >
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedOffer && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedOffer.description}</Text>
              <Text style={styles.modalText}>{selectedOffer.location}</Text>
              <Text style={styles.modalText}>{selectedOffer.payment}</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: selectedOffer.latitude,
                  longitude: selectedOffer.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: selectedOffer.latitude,
                    longitude: selectedOffer.longitude,
                  }}
                  title={selectedOffer.description}
                  description={selectedOffer.location}
                />
              </MapView>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  totalOffersContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  totalOffersText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  offerContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerDetails: {
    flex: 1,
  },
  offerDescription: {
    fontSize: 18,
    marginBottom: 4,
  },
  offerLocation: {
    fontSize: 14,
    color: "#666",
  },
  offerPayment: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  declineButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 20,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "60%",
    backgroundColor: "white",
    borderRadius: 20,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 150,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 20,
    marginRight: 8,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
