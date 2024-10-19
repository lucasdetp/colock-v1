// app/navigator/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen, AddPictureScreen} from '@/components/pages'; 

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AddPictureScreen" component={AddPictureScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
