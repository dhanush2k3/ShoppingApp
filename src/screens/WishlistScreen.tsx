import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import {
  removeFromWhishlist,
  WishlistItem,
} from '../redux/reducers/wishlistSlice';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { RootTabParamList } from '../navigators/AppNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProductsStackParamList } from '../navigators/ProductsStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;
type WishlistNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Wishlist'>,
  NativeStackNavigationProp<ProductsStackParamList>
>;
const WishlistScreen = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<WishlistNavProp>();
  const renderItem = ({ item }: { item: WishlistItem }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Products', {
          screen: 'ProductDetails',
          params: { product: item },
        })
      }
    >
      <View style={styles.Card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={() => {
              dispatch(removeFromWhishlist(item.id));
            }}
          >
            <Ionicons name="heart" size={24} color="#f00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    width: ITEM_WIDTH,
    margin: 4,
  },
  cardImage: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
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
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  removeButton: {
    marginTop: 6,
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default WishlistScreen;
