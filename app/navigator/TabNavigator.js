import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SwipeScreen, AccountScreen } from '@/components/pages';
import SvgAccount from '@/assets/svg/account';
import SvgAccountFull from '@/assets/svg/accountFull';
import SvgMessage from '@/assets/svg/message';
import SvgMessageFull from '@/assets/svg/messageFull';
import SvgSwipe from '@/assets/svg/swipe';
import SvgSwipeFull from '@/assets/svg/swipeFull';
import { Container } from '@/components/atoms';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

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
          width: tabWidth - 60,
          height: 40,
          backgroundColor: '#7790ed',
          opacity: 0.3,
          borderRadius: 15,
          bottom: 20,
          left: 30,
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
            {route.name === 'Swipe' && (focused ? <SvgSwipeFull /> : <SvgSwipe />)}
            {route.name === 'Messages' && (focused ? <SvgMessageFull /> : <SvgMessage />)}
            {route.name === 'Account' && (focused ? <SvgAccountFull /> : <SvgAccount />)}
          </TouchableOpacity>
        );
      })}
    </Container.BasicView>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Messages" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
