import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ProductDescription: React.FC<{ description: string }> = ({
  description,
}) => (
  <>
    <Text style={styles.title}>Description</Text>
    <Text style={styles.text}>{description}</Text>
  </>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#1e1e1e',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
});

export default ProductDescription;
