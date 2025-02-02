// components/atoms/TextInput/Base.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const BaseTextInput = ({ placeholder, secureTextEntry, onChangeText, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default BaseTextInput;
