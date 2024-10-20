// components/atoms/Swipe.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Swipe = ({ source, style }) => {
  return <Image source={source} style={[styles.defaultImage, style]} resizeMode="cover" />;
};

const styles = StyleSheet.create({
  defaultImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default Swipe;
