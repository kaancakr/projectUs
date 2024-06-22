import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const transactions = [
  { id: '1', description: 'Transaction 1', amount: '$10' },
  { id: '2', description: 'Transaction 2', amount: '$20' },
  { id: '3', description: 'Transaction 3', amount: '$30' },
  // Add more transactions as needed
];

const AnimatedCard: React.FC = () => {
  const animation = useSharedValue(0);

  React.useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: 500,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: animation.value * 5 - 2.5 },
      { translateY: animation.value * 5 - 2.5 },
    ],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <LinearGradient
        colors={['#005B41', '#C6DE41']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.cardText}>Animated Card</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const renderItem: ListRenderItem<{ id: string; description: string; amount: string }> = ({ item }) => (
  <View style={styles.transactionItem}>
    <Text style={{color: '#fff', fontSize: 16}}>{item.description}</Text>
    <Text style={{color: '#fff', fontSize: 14}}>{item.amount}</Text>
  </View>
);

const Page: React.FC = () => {
  return (
    <View style={styles.container}>
      <AnimatedCard />
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    height: 200,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Page;