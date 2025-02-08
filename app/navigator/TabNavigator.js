import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, SwipeScreen, AccountScreen, AboutMeScreen, AboutMeScreen2, IdentityScreen, RythmePreferenceScreen, PrincipalCaractereScreen, SwipePlusScreen, SaveScreen, NosFormulesScreen, UserPhotosScreen, UserInfoScreen, PaymentInfoScreen, NewAboutMeScreen, SearchScreen, WhenBudgetScreen, WhereEditScreen, ColocScreen, GoodOrNotScreen } from '@/components/pages';
import SvgAccount from '@/assets/svg/account';
import SvgAccountFull from '@/assets/svg/accountFull';
import SvgMessage from '@/assets/svg/message';
import SvgMessageFull from '@/assets/svg/messageFull';
import SvgSwipe from '@/assets/svg/swipe';
import SvgSwipeFull from '@/assets/svg/swipeFull';
import SvgHistorique from '@/assets/svg/historique';
import SvgHistoriqueFull from '@/assets/svg/historiqueFull';
import SvgFormules from '@/assets/svg/formules';
import SvgFormulesFull from '@/assets/svg/formulesFull';
import { Container } from '@/components/atoms';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
      <Stack.Screen name="AboutMeScreen2" component={AboutMeScreen2} />
      <Stack.Screen name="NewAboutMeScreen" component={NewAboutMeScreen} />
      <Stack.Screen name="IdentityScreen" component={IdentityScreen} />
      <Stack.Screen name="RythmePreferenceScreen" component={RythmePreferenceScreen} />
      <Stack.Screen name="PrincipalCaractereScreen" component={PrincipalCaractereScreen} />
      <Stack.Screen name="UserPhotosScreen" component={UserPhotosScreen} />
      <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <Stack.Screen name="PaymentInfoScreen" component={PaymentInfoScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="WhenBudgetScreen" component={WhenBudgetScreen} />
      <Stack.Screen name="WhereEditScreen" component={WhereEditScreen} />
      <Stack.Screen name="ColocScreen" component={ColocScreen} />
      <Stack.Screen name="GoodOrNotScreen" component={GoodOrNotScreen} />

    </Stack.Navigator>
  );
};
const SwipeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
      <Stack.Screen name="SwipePlusScreen" component={SwipePlusScreen} />
    </Stack.Navigator>
  );
};
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const tabWidth = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      speed: 8,
      bounciness: 10,
    }).start();
  }, [state.index]);

  return (
    <Container.BasicView style={{ flexDirection: 'row', height: 75, backgroundColor: 'white' }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: tabWidth - 40,
          height: 40,
          backgroundColor: '#7790ed',
          opacity: 0.3,
          borderRadius: 15,
          bottom: 19,
          left: 20,
          transform: [{ translateX }],
        }}
      />
      
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {route.name === 'SaveScreen' && (focused ? <SvgHistoriqueFull /> : <SvgHistorique />)}
            {route.name === 'Swipe' && (focused ? <SvgSwipeFull /> : <SvgSwipe />)}
            {route.name === 'Messages' && (focused ? <SvgMessageFull /> : <SvgMessage />)}
            {route.name === 'Account' && (focused ? <SvgAccountFull /> : <SvgAccount />)}
            {route.name === 'NosFormules' && (focused ? <SvgFormulesFull /> : <SvgFormules />)}
          </TouchableOpacity>
        );
      })}
    </Container.BasicView>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }} initialRouteName="Swipe" >
      <Tab.Screen name="SaveScreen" component={SaveScreen} />
      <Tab.Screen name="Swipe" component={SwipeStack} />
      <Tab.Screen name="Messages" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountStack} />
      <Tab.Screen name="NosFormules" component={NosFormulesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
