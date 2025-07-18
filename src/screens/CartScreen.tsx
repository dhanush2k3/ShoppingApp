import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import {
  increaseQty,
  decreaseQty,
  clearCart,
  removeFromCart,
} from '../redux/reducers/cartSlice';
import { placeOrder } from '../redux/reducers/orderSlice';
import { Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(decreaseQty(item.id))}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(increaseQty(item.id))}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeIconButton}
            onPress={() => dispatch(removeFromCart(item.id))}
          >
            <Ionicons name="trash-outline" size={20} color="#c62828" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  if (cartItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your Cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 250 }}
      />
      {cartItems.length > 0 && (
        <View style={styles.footerContainer}>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              const orderData = {
                items: cartItems,
                total: total,
                date: new Date().toISOString(),
              };
              dispatch(placeOrder(orderData));
              dispatch(clearCart());
              Alert.alert('Order placed!');
            }}
          >
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
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
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 20,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconButton: {
    marginLeft: 150,
    padding: 6,
    backgroundColor: '#fce4e4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartScreen;
