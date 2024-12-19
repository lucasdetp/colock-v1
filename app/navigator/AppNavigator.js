// app/navigator/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, AddPictureScreen, ChatScreen } from '@/components/pages'; 
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ isRegistered, isAddPicture }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isRegistered ? (
        <>
          <Stack.Screen name="AddPictureScreen" component={AddPictureScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
