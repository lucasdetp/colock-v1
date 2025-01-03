import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ImageAccount = ({ source, userName, style, textStyle, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={styles.image} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2, 
    borderColor: '#007BFF',
    resizeMode: 'cover',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageAccount;
