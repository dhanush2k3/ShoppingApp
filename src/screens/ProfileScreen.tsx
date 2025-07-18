import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store/store';
import { updateAvatar, updateProfile } from '../redux/reducers/profileSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setAvatar(profile.avatar);
  }, [profile.name, profile.email, profile.avatar]);

  const handleSave = () => {
    dispatch(updateProfile({ name, email }));
  };
  const orders = useSelector((state: RootState) => state.orders.orders);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets && response.assets[0]) {
        const uri = response.assets[0].uri;
        if (uri) {
          setUploading(true);
          setTimeout(() => {
            setAvatar(uri);
            dispatch(updateAvatar(uri)); // Save in Redux
            setUploading(false);
          }, 2000);
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Avatar and Inputs */}
        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={
              avatar ? { uri: avatar } : require('../assets/image/miya.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.changePhoto}>Change Photo</Text>
        </TouchableOpacity>

        {uploading && <ActivityIndicator size="small" color="#007AFF" />}

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

        <TouchableOpacity onPress={handleSave} style={styles.save}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Order History</Text>

          {orders.length === 0 ? (
            <Text style={styles.emptyOrderText}>No orders yet.</Text>
          ) : (
            orders.map((item, index) => (
              <View key={index} style={styles.orderCard}>
                {item.items.map(product => (
                  <View key={product.id} style={styles.itemRow}>
                    <Image
                      source={{ uri: product.thumbnail }}
                      style={styles.image}
                    />
                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>{product.title}</Text>
                      <Text style={styles.price}>
                        ₹{product.price} x {product.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalPrice}>
                    ₹{item.total.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.dateText}>
                  Ordered on: {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </View>
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
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
  changePhoto: {
    textAlign: 'center',
    color: '#000000',
    marginTop: 8,
    marginBottom: 24,
    fontWeight: '400',
  },
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
  ordersSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyOrderText: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 16,
    borderRadius: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    color: '#444',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default ProfileScreen;
