import React from 'react';
import { FlatList, SafeAreaView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import {
  increaseQty,
  decreaseQty,
  clearCart,
  removeFromCart,
} from '../redux/reducers/cartSlice';
import { placeOrder } from '../redux/reducers/orderSlice';
import CartItemCard from '../components/Cart/CartItemCard';
import CartFooter from '../components/Cart/CartFooter';
import EmptyCartMessage from '../components/Cart/EmptyCartMessage';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleBuyNow = () => {
    const orderData = {
      items: cartItems,
      total: total,
      date: new Date().toISOString(),
    };
    dispatch(placeOrder(orderData));
    dispatch(clearCart());
    Alert.alert('Order placed!');
  };

  const renderItem = ({ item }: any) => (
    <CartItemCard
      item={item}
      onDecrease={() => dispatch(decreaseQty(item.id))}
      onIncrease={() => dispatch(increaseQty(item.id))}
      onRemove={() => dispatch(removeFromCart(item.id))}
    />
  );

  if (cartItems.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 250 }}
      />
      <CartFooter total={total} onBuyNow={handleBuyNow} />
    </SafeAreaView>
  );
};

export default CartScreen;
