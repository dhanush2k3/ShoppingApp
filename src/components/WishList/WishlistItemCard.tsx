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
import { WishlistItem } from '../../redux/reducers/wishlistSlice';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

interface WishlistItemCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onPress: () => void;
}

const WishlistItemCard = ({
  item,
  onRemove,
  onPress,
}: WishlistItemCardProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.Card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
        <TouchableOpacity style={styles.wishlistIcon} onPress={onRemove}>
          <Ionicons name="heart" size={24} color="#f00" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  Card: {
    width: ITEM_WIDTH,
    margin: 4,
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 230,
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

export default WishlistItemCard;
