import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface ProfileAvatarProps {
  avatar: string | null;
  uploading: boolean;
  onPickImage: () => void;
}

const ProfileAvatar = ({
  avatar,
  uploading,
  onPickImage,
}: ProfileAvatarProps) => (
  <View style={styles.avatarContainer}>
    <TouchableOpacity onPress={onPickImage}>
      <Image
        source={
          avatar ? { uri: avatar } : require('../../assets/image/miya.jpg')
        }
        style={styles.avatar}
      />
    </TouchableOpacity>
    <Text style={styles.changePhoto}>Change Photo</Text>
    {uploading && <ActivityIndicator size="small" color="#007AFF" />}
  </View>
);

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  changePhoto: {
    marginTop: 8,
    color: '#000',
    fontWeight: '500',
  },
});

export default ProfileAvatar;
