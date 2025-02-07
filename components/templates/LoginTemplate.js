import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LoginForm } from '../organims';
import { Container, Text } from '../atoms';
import SvgLogoHome from '@/assets/svg/logoHome';

const LoginTemplate = ({ logo, email, setEmail, password, setPassword, handleLogin, alert, alertMessage, navigateToRegister }) => {
  return (
    <Container.BasicView style={styles.container}>
      <Container.BasicView style={styles.logo}>
        <SvgLogoHome />
      </Container.BasicView>
      
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
    </Container.BasicView>
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
    marginBottom: 20,
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
  },
});

export default LoginTemplate;
