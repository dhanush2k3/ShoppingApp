import React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ProfileFormProps {
  name: string;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
}

const ProfileForm = ({
  name,
  email,
  setName,
  setEmail,
  onSave,
}: ProfileFormProps) => (
  <React.Fragment>
    <TextInput
      placeholder="Name"
      value={name}
      onChangeText={setName}
      style={styles.input}
    />
    <TextInput
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={styles.input}
      keyboardType="email-address"
    />
    <TouchableOpacity onPress={onSave} style={styles.save}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  </React.Fragment>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  save: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 25,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ProfileForm;
