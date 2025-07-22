import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface OrderProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  items: OrderProduct[];
  total: number;
  date: string;
}
interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ({ orders }: OrderHistoryProps) => (
  <View style={styles.ordersSection}>
    <Text style={styles.sectionTitle}>Order History</Text>
    {orders.length === 0 ? (
      <Text style={styles.emptyOrderText}>No orders yet.</Text>
    ) : (
      orders.map((item, index) => (
        <View key={index} style={styles.orderCard}>
          {item.items.map(product => (
            <View key={product.id} style={styles.itemRow}>
              <Image source={{ uri: product.thumbnail }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>
                  ₹{product.price} x {product.quantity}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>₹{item.total.toFixed(2)}</Text>
          </View>
          <Text style={styles.dateText}>
            Ordered on: {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      ))
    )}
  </View>
);

const styles = StyleSheet.create({
  ordersSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyOrderText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    color: '#444',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default OrderHistory;
