import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  brand: string;
  price: number;
  rating: number;
}

const ProductInfoBlock: React.FC<Props> = ({ title, brand, price, rating }) => (
  <View>
    <View style={styles.titleRow}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.price}>₹{price}</Text>
    </View>
    <Text style={styles.brand}>{brand}</Text>
    <Text style={styles.rating}>⭐ {rating} / 5</Text>
  </View>
);

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#1e1e1e',
    marginBottom: 4,
  },
  brand: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
    marginLeft: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  rating: {
    alignSelf: 'flex-start',
    backgroundColor: '#d1fae5',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default ProductInfoBlock;
