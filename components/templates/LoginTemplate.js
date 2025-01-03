// components/templates/LoginTemplate.js
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {LoginForm} from '../organims';
import { Text } from '../atoms'
const LoginTemplate = ({ logo, email, setEmail, password, setPassword, handleLogin, alert, alertMessage, navigateToRegister }) => {
  return (
    <View style={styles.container}>
      <Text.Base style={styles.title}>Connexion</Text.Base>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        alert={alert}
        alertMessage={alertMessage}
      />

      <TouchableOpacity onPress={navigateToRegister}>
        <Text.Base style={styles.linkText}>Inscription</Text.Base>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 64,
    height: 64,
  },
  linkText: {
    marginTop: 20,
    color: '#6D6D6D',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    bottom: 150,
  },
});

export default LoginTemplate;
