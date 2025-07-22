// screens/ProductDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductsStackParamList } from '../navigators/ProductsStack';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { addToWhishlist } from '../redux/reducers/wishlistSlice';
import ProductInfoBlock from '../components/ProductDetails/ProductInfoBlock';
import ActionButtons from '../components/ProductDetails/ActionButtons';
import ReviewCard from '../components/ProductDetails/ReviewCard';
import ProductImage from '../components/ProductDetails/ProductImage';
import ProductMetaInfo from '../components/ProductDetails/ProductMetaInfo';
import Badge from '../components/ProductDetails/Badge';
import ProductDescription from '../components/ProductDetails/ProductDescription';

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<ProductsStackParamList, 'ProductDetails'>>();
  const { product } = route.params;
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <ProductImage uri={product.thumbnail} />
      <View style={styles.content}>
        <Badge label="✨ Best Seller" />
        <ProductInfoBlock
          title={product.title}
          brand={product.brand}
          price={product.price}
          rating={product.rating}
        />
        <ProductDescription description={product.description} />
        <ProductMetaInfo
          category={product.category}
          availabilityStatus={product.availabilityStatus}
          stock={product.stock}
        />
        <ActionButtons
          onAddToCart={() => dispatch(addToCart(product))}
          onAddToWishlist={() => dispatch(addToWhishlist(product))}
        />
      </View>
      {product.reviews?.length > 0 ? (
        product.reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      ) : (
        <Text style={styles.noReview}>No reviews available</Text>
      )}
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  reviewsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 18,
  },
  noReview: {
    color: '#888',
    fontStyle: 'italic',
  },
});
