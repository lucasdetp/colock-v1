// components/atoms/Text/Base.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Base = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'CustomFont'
  },
});

export default Base;
