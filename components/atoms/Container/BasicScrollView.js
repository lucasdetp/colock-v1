import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const BasicScrollView = ({ children, style, contentContainerStyle, ...props }) => {
  return (
    <ScrollView 
      style={[styles.defaultStyle, style]} 
      contentContainerStyle={contentContainerStyle} 
      {...props}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {},
});

export default BasicScrollView;
