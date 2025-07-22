import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import { updateAvatar, updateProfile } from '../redux/reducers/profileSlice';
import ProfileAvatar from '../components/Profile/ProfileAvatar';
import ProfileForm from '../components/Profile/ProfileForm';
import OrderHistory from '../components/Profile/OrderHistory';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const profile = useSelector((state: RootState) => state.profile);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setAvatar(profile.avatar);
  }, [profile]);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets && response.assets[0]) {
        const uri = response.assets[0].uri;
        if (uri) {
          setUploading(true);
          setTimeout(() => {
            setAvatar(uri);
            dispatch(updateAvatar(uri));
            setUploading(false);
          }, 2000);
        }
      }
    });
  };

  const handleSave = () => {
    dispatch(updateProfile({ name, email }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Avatar */}
        <ProfileAvatar
          avatar={avatar}
          uploading={uploading}
          onPickImage={handleImagePick}
        />

        {/* Profile Form */}
        <ProfileForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          onSave={handleSave}
        />

        {/* Order History */}
        <OrderHistory orders={orders} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
});

export default ProfileScreen;
