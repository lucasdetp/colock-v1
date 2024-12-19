import React from 'react';
import { View, StyleSheet } from 'react-native';

const BasicView = ({ children, style, ...props }) => {
  return (
    <View style={[styles.defaultStyle, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {},
});

export default BasicView;
