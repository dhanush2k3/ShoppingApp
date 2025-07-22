import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
}

const SearchBar: React.FC<Props> = ({ onPress }) => (
  <View style={styles.container}>
    <Ionicons
      name="search-outline"
      size={22}
      color="#aaa"
      style={styles.icon}
    />
    <TouchableOpacity style={styles.searchBar} onPress={onPress}>
      <Text style={styles.placeholder}>Search Products</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 40,
    paddingHorizontal: 12,
    height: 55,
    elevation: 6,
  },
  icon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,
  },
});

export default SearchBar;
