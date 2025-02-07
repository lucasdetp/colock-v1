// components/organisms/LoginForm.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BaseTextInput from '../atoms/TextInput/Base';
import { Text } from '../atoms';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, alert, alertMessage }) => {
  return (
    <View style={styles.inputContainer}>
      {/* Alert */}
      {alert && <Text.Base style={styles.alertText}>{alertMessage}</Text.Base>}

      <Text.Base style={styles.name}>Email</Text.Base>
      {/* Email Input */}
      <BaseTextInput
        placeholder="p.nom@domaine.com"
        onChangeText={setEmail}
        secureTextEntry={false}
      />

      <Text.Base style={styles.name}>Mot de passe</Text.Base>
      {/* Password Input */}
      <BaseTextInput
        placeholder="Saisissez le mot de passe"
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.forgetPasswordButton}>
        <Text.Base style={styles.buttonTextForget}>Mot de passe oublié</Text.Base>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text.Base style={styles.buttonText}>Connexion</Text.Base>
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
  desc: {
    fontSize: 11,
    color: '#3A3A3A',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  forgetPasswordButton: {
    marginTop: 35,
  },
  buttonTextForget: {
    color: '#3A3A3A',
    fontSize: 16,
    fontWeight: '400',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  alertText: {
    fontSize: 16,
    color: 'red',
  },
  button: {
    width: '50%',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#C9DDFC',
  },
  buttonText: {
    color: '#3A3A3A',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default LoginForm;
