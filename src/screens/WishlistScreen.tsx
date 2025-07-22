import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import {
  removeFromWhishlist,
  WishlistItem,
} from '../redux/reducers/wishlistSlice';
import WishlistItemCard from '../components/WishList/WishlistItemCard';
import { useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '../navigators/MainTabNavigator';
import { ProductsStackParamList } from '../navigators/ProductsStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

type WishlistNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Wishlist'>,
  NativeStackNavigationProp<ProductsStackParamList>
>;

const WishlistScreen = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<WishlistNavProp>();

  const renderItem = ({ item }: { item: WishlistItem }) => (
    <WishlistItemCard
      item={item}
      onRemove={() => dispatch(removeFromWhishlist(item.id))}
      onPress={() =>
        navigation.navigate('Products', {
          screen: 'ProductDetails',
          params: { product: item },
        })
      }
    />
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
