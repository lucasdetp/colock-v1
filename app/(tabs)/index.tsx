import React from 'react';
import { Provider } from 'react-redux';  
import { View } from 'react-native';
import { RegisterScreen } from '@/components/pages';
import Store from '@/context/store';  

export default function HomeScreen() {
  return (
    <Provider store={Store}>  
      <View style={{ flex: 1 }}>
        <RegisterScreen />
      </View>
    </Provider>
  );
}
