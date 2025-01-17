import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SecondSwipe = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7790ED",
    padding: 5,
    width: 50,
    height: 50,
    top: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SecondSwipe;
