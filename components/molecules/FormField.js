import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseTextInput from '../atoms/TextInput/Base';

const FormField = ({ label, placeholder, secureTextEntry, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <BaseTextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default FormField;
