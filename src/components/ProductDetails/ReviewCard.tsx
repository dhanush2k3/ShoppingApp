import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <View style={styles.card}>
    <Text style={styles.reviewerName}>{review.reviewerName}</Text>
    <Text style={styles.ratingStars}>⭐ {review.rating}/5</Text>
    <Text style={styles.comment}>{review.comment}</Text>
    <Text style={styles.reviewDate}>
      {new Date(review.date).toLocaleDateString()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
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
});

export default ReviewCard;
