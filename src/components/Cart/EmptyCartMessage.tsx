import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyCartMessage = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.emptyText}>Your Cart is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default EmptyCartMessage;
