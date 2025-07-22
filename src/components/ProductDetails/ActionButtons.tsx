import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const ActionButtons: React.FC<Props> = ({ onAddToCart, onAddToWishlist }) => (
  <View style={styles.buttons}>
    <TouchableOpacity style={styles.button} onPress={onAddToCart}>
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onAddToWishlist}>
      <Text style={styles.buttonText}>Add to Wishlist</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ActionButtons;
