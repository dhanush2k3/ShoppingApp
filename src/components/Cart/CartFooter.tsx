import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CartFooterProps {
  total: number;
  onBuyNow: () => void;
}

const CartFooter = ({ total, onBuyNow }: CartFooterProps) => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={onBuyNow}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buyButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 6,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartFooter;
