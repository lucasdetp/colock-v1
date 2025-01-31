// app/navigator/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, AddPictureScreen, ChatScreen, AboutMeScreen, AboutMeScreen2, SwipePlusScreen, WelcomeScreen, WhoScreen, WhereScreen, LikesScreen, IdentityScreen, RythmePreferenceScreen, PrincipalCaractereScreen, SaveScreen } from '@/components/pages'; 
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
          <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
          <Stack.Screen name="AboutMeScreen2" component={AboutMeScreen2} />
          <Stack.Screen name="SwipePlusScreen" component={SwipePlusScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="WhoScreen" component={WhoScreen} />
          <Stack.Screen name="SaveScreen" component={SaveScreen} />
          <Stack.Screen name="WhereScreen" component={WhereScreen} />
          <Stack.Screen name="LikesScreen" component={LikesScreen} />
          <Stack.Screen name="IdentityScreen" component={IdentityScreen} />
          <Stack.Screen name="RythmePreferenceScreen" component={RythmePreferenceScreen} />
          <Stack.Screen name="PrincipalCaractereScreen" component={PrincipalCaractereScreen} />
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
