import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Local = ({ source, style }) => {
  return <Image source={source} style={[styles.image, style]} resizeMode="contain" resizeMethod="resize" />
};


const styles = StyleSheet.create({
  image: {
    width: 335,
    height: 335,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default Local;