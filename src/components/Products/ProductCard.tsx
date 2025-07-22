import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Product } from '../../assets/types/Product';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

interface Props {
  item: Product;
  onPress: () => void;
  onWishlistPress: () => void;
}

const ProductCard: React.FC<Props> = ({ item, onPress, onWishlistPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
      <TouchableOpacity style={styles.wishlistIcon} onPress={onWishlistPress}>
        <Ionicons name="heart-outline" size={23} color="#999" />
      </TouchableOpacity>
    </View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.price}>₹{item.price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    margin: 6,
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    position: 'relative',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1C1C1E',
    marginTop: 6,
    marginLeft: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginTop: 2,
    marginLeft: 4,
  },
});

export default ProductCard;
