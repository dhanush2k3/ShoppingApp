import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Product } from '../../assets/types/Product';

type Props = {
  item: Product;
  onPress: () => void;
  onWishlistPress: () => void;
};

const ProductCard: React.FC<Props> = ({ item, onPress, onWishlistPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={onWishlistPress}
          >
            <Ionicons name="heart-outline" size={23} color="#999" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: (Dimensions.get('window').width - 40) / 2,
    margin: 6,
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
