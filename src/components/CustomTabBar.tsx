import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconName: string;
        switch (route.name) {
          case 'Products':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Cart':
            iconName = isFocused ? 'cart' : 'cart-outline';
            break;
          case 'Wishlist':
            iconName = isFocused ? 'heart' : 'heart-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'ellipse-outline';
        }

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <View style={[styles.iconView]}>
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                { backgroundColor: isFocused ? '#fff' : 'transparent' },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? '#000' : '#ccc'}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 20,
    height: 60,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    width: width - 27,
    marginLeft: 13,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
  },
  iconView: {
    padding: 10,
  },
});

export default CustomTabBar;
