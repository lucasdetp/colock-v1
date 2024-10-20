// components/atoms/Image/Base.js
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Base = ({ uri, style }) => {
  return (
    <Image source={{ uri }} style={[styles.image, style]} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
});

export default Base;
