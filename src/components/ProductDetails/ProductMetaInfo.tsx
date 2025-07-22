import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  category: string;
  availabilityStatus: string;
  stock: number;
}

const ProductMetaInfo: React.FC<Props> = ({
  category,
  availabilityStatus,
  stock,
}) => (
  <View style={styles.container}>
    <Text style={styles.infoText}>
      <Text style={styles.label}>Category:</Text> {category}
    </Text>
    <Text style={styles.infoText}>
      <Text style={styles.label}>Availability:</Text> {availabilityStatus}
    </Text>
    <Text style={styles.infoText}>
      <Text style={styles.label}>Stock:</Text>{' '}
      {stock > 0 ? stock : 'Out of stock'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
  },
  label: {
    fontWeight: '600',
    color: '#000',
  },
});

export default ProductMetaInfo;
