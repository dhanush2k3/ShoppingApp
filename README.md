Project Summary:

This project is a fully functional **React Native e-commerce application** designed with a focus on modular architecture, user experience, and efficient state management. It simulates core features of an online shopping app, including product browsing, cart management, order history, user profile updates, and wishlist functionality.

Key Features

Product Stack Navigation

  * Product listing screen with responsive grid layout
  * Detailed product view with dynamic data passed via navigation
  * Integrated search screen for product filtering

User Profile Management

  * Editable user profile with real-time name and email updates
  * Profile picture update using `react-native-image-picker`
  * Redux state management for user data (name, email, avatar)

Cart System

  * Add-to-cart functionality with quantity management
  * Real-time total price calculation
  * Cart item structure optimized for rendering and state updates

Wishlist Integration

  * Add/remove products to/from wishlist
  * Managed via Redux for global accessibility
  * Navigation stack integrated without losing tab persistence

Order History

  * Orders section available within the Profile screen
  * Displays product thumbnails, quantities, total cost, and order date
  * Scrollable layout using FlatList with dynamic rendering

Custom Bottom Tab Navigation

  * Icons with conditional styling based on focus state
  * Layout adjustments for proper alignment and touch handling
  * Uses `Ionicons` and a custom `CustomTabBar` component

UI/UX Enhancements

  * `SafeAreaView` implemented across screens for device-safe layouts
  * Reusable styling via StyleSheet for consistent design
  * Activity indicators and loading states during image upload

State Management

  * Redux Toolkit used for efficient and scalable global state handling
  * Modular slices for `profile`, `cart`, `wishlist`, and `orders`
  * Typed Redux store integration with TypeScript support

Technologies Used

* React Native
* Redux Toolkit
* React Navigation
* TypeScript
* React Native Image Picker
* FlatList and ScrollView for dynamic UI rendering

![ShoppingApp-category](https://github.com/user-attachments/assets/106ea2e1-cc2b-4cb5-89d2-8a975454d07c)
![ShoppingApp-reviews](https://github.com/user-attachments/assets/f981e95c-344d-47c2-bc05-f6cf01c3ac23)
![ShoppingApp-Pics](https://github.com/user-attachments/assets/8d6b5435-9943-44f2-937f-90c43181b995)
![ShoppingApp-Home](https://github.com/user-attachments/assets/89bb7f21-1d52-4ca7-94de-25a91f861377)
![ShoppingApp-details1](https://github.com/user-attachments/assets/8dc06fd6-6d87-415e-89ee-a36dd5f942b2)
![ShoppingApp-details](https://github.com/user-attachments/assets/f6976c21-715e-4a60-98d5-65438d9c80a8)
![shoppingApp-Wishlist](https://github.com/user-attachments/assets/9ae5ff91-2c2a-43a8-b5a5-c481a5bff47b)
![shoppingApp-Profile](https://github.com/user-attachments/assets/95812d15-d84a-4d5c-87a6-2983023a3e6b)
![shoppingApp-Cart](https://github.com/user-attachments/assets/0d359eed-1681-454b-96c4-f7dec35b57f2)
![shoppingApp-OrderHistory](https://github.com/user-attachments/assets/882bdd0f-8826-46f0-a099-8290e57122e5)

