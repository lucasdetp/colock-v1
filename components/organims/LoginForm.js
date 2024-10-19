// components/organisms/LoginForm.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BaseTextInput from '../atoms/TextInput/Base';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, alert, alertMessage }) => {
  return (
    <View style={styles.inputContainer}>
      {/* Alert */}
      {alert && <Text style={styles.alertText}>{alertMessage}</Text>}

      {/* Email Input */}
      <BaseTextInput
        placeholder="Email"
        onChangeText={setEmail}
        secureTextEntry={false}
      />

      {/* Password Input */}
      <BaseTextInput
        placeholder="Mot de passe"
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 16,
    color: 'red',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginForm;
