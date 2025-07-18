// screens/ProductDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProductsStackParamList } from '../navigators/ProductsStack';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import { addToWhishlist } from '../redux/reducers/wishlistSlice';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const route = useRoute<RouteProp<ProductsStackParamList, 'ProductDetails'>>();
  const { product } = route.params;
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Best Seller</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {product.title}
          </Text>
          <Text style={styles.price}>₹{product.price}</Text>
        </View>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.rating}>⭐ {product.rating} / 5</Text>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.productInfo}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Category:</Text> {product.category}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Availability:</Text>{' '}
            {product.availabilityStatus}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Stock:</Text>{' '}
            {product.stock > 0 ? product.stock : 'Out of stock'}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000000' }]}
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#000000' }]}
            onPress={() => dispatch(addToWhishlist(product))}
          >
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewerName}>{review.reviewerName}</Text>
              <Text style={styles.ratingStars}>⭐ {review.rating}/5</Text>
              <Text style={styles.comment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReview}>No reviews available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 32,
    height: width * 0.7,
    resizeMode: 'contain',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  content: {
    padding: 16,
  },
  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'baseline',
    marginBottom: 8,
  },

  badgeText: {
    color: '#059669',
    fontWeight: '600',
    fontSize: 12,
  },
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
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#1e1e1e',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  reviewCard: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  ratingStars: {
    color: '#f5a623',
    marginBottom: 6,
  },
  comment: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  reviewDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  noReview: {
    color: '#888',
    fontStyle: 'italic',
  },
  productInfo: {
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
  infoLabel: {
    fontWeight: '600',
    color: '#000',
  },
});
