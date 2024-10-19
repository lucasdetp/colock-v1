// components/templates/LoginTemplate.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {LoginForm} from '../organims';

const LoginTemplate = ({ logo, email, setEmail, password, setPassword, handleLogin, alert, alertMessage, navigateToRegister }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
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
        <Text style={styles.linkText}>Je n'ai pas encore de compte</Text>
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
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default LoginTemplate;
