// components/atoms/Swipe.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Swipe = ({ children, style }) => {
  return <Text style={[styles.defaultText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Swipe;
