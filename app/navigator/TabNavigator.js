// app/navigator/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SwipeScreen, ChatScreen } from '@/components/pages';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Swipe') {
            return (
              <MaterialIcons
                name={focused ? "favorite" : "favorite-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Messages') {
            return (
              <Entypo
                name="message" 
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: '#6d24a5',
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Messages" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
