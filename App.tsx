import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store/store';
import AppNavigator from './src/navigators/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
