import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }: Props) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={onDecrease}>
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={onIncrease}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeIconButton} onPress={onRemove}>
            <Ionicons name="trash-outline" size={20} color="#c62828" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 1,
    marginHorizontal: 6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'contain',
  },
  infoContainer: { flex: 1, justifyContent: 'space-between' },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: { color: '#FFFFFF', fontSize: 18 },
  qtyCount: { marginHorizontal: 12, fontSize: 17, fontWeight: '400' },
  removeIconButton: {
    marginLeft: 150,
    padding: 6,
    backgroundColor: '#fce4e4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartItemCard;
