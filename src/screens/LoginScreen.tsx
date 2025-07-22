import React, { useState } from 'react';
import * as Keychain from 'react-native-keychain';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Platform,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useLoginMutation } from '../redux/reducers/authApi';
import { RootTabParamList } from '../navigators/MainTabNavigator';
import { setUser } from '../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
type AuthScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  NativeStackNavigationProp<any>
>;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      console.log('Trying login...');
      const user = await login({ username, password }).unwrap();
      console.log('Login API Success:', user);

      console.log('Saving token...');
      await Keychain.setGenericPassword('refresh', user.refreshToken);
      console.log('Token saved.');

      dispatch(setUser(user));
      console.log('User set in Redux.');

      navigation.navigate('Products', {
        screen: 'ProductList',
      });
    } catch (err: any) {
      console.log('Login Error Full:', JSON.stringify(err, null, 2));
      Alert.alert('Login failed', err?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="light-content"
      />
      <ImageBackground
        source={require('../assets/image/Login_Background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView style={styles.formWrapper} behavior="height">
          <View style={styles.loginBox}>
            <Image
              source={require('../assets/image/logo2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Login</Text>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#ccc"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>Signin</Text>
              )}
            </TouchableOpacity>

            {error && (
              <Text style={styles.error}>Invalid username or password</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // fallback background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: '80%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    borderWidth: 2,
    borderColor: '#999',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
