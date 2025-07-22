import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  active: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<Props> = ({ name, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: active ? '#000' : '#F6F6F6' }]}
  >
    <Text style={[styles.text, { color: active ? '#FFF' : '#1E1E1E' }]}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    marginHorizontal: 6,
    marginBottom: 14,
    minHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CategoryButton;
