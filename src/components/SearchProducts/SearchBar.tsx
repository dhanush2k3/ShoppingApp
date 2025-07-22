import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

const SearchBar: React.FC<Props> = ({ value, onChangeText, onSubmit }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
