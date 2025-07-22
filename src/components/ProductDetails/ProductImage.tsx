import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductImage: React.FC<{ uri: string }> = ({ uri }) => (
  <Image source={{ uri }} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: width - 32,
    height: width * 0.7,
    resizeMode: 'contain',
    borderRadius: 16,
    marginHorizontal: 16,
  },
});

export default ProductImage;
