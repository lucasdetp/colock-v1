import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {RegistrationForm} from '../organims';
import { Text } from '../atoms';
import { Container } from '../atoms';
import SvgLogoHome from '@/assets/svg/logoHome';

const RegisterTemplate = ({
  logo,
  name,
  setName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  setConfirmPassword,
  coloc,
  toggleSwitch,
  handleRegister,
  navigateToLogin,
}) => {
  return (
    <View style={styles.container}>
       <Container.BasicView style={styles.logo}>
        <SvgLogoHome />
      </Container.BasicView>
      <RegistrationForm
        name={name}
        setName={setName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        coloc={coloc}
        toggleSwitch={toggleSwitch}
        handleRegister={handleRegister}
      />
      <TouchableOpacity onPress={navigateToLogin}>
        <Text.Base style={styles.linkText}>Connexion</Text.Base>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    bottom: 10,
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
});

export default RegisterTemplate;
