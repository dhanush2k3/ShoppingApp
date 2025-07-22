import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export default Badge;
