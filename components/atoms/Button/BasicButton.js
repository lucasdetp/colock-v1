import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const BasicButton = ({ children, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.defaultStyle, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {},
});

export default BasicButton;
