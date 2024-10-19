import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {RegistrationForm} from '../organims';

const RegisterTemplate = ({
  logo,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  coloc,
  toggleSwitch,
  handleRegister,
  navigateToLogin,
}) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <RegistrationForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        coloc={coloc}
        toggleSwitch={toggleSwitch}
        handleRegister={handleRegister}
      />
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.linkText}>J'ai déjà un compte</Text>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  linkText: {
    marginTop: 20,
    color: 'red',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default RegisterTemplate;
