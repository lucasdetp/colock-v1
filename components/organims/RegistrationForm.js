import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormField from '../molecules/FormField';
import { Container, Text} from '../atoms';
import BaseTextInput from '../atoms/TextInput/Base';

const RegistrationForm = ({
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
}) => {
  return (
    <Container.BasicView style={styles.container}>
      <Text.Base style={styles.name}>Prénom</Text.Base>
      <BaseTextInput
        label="Prénom"
        placeholder="Prénom"
        onChangeText={setName}
      />
      <Text.Base style={styles.name}>Nom</Text.Base>
      <BaseTextInput
        label="Nom"
        placeholder="Nom"
        onChangeText={setLastName}
      />
      <Text.Base style={styles.name}>Email</Text.Base>
      <BaseTextInput
        label="Email"
        placeholder="Email"
        onChangeText={setEmail}
      />
      <Text.Base style={styles.name}>Mot de passe</Text.Base>
      <BaseTextInput
        label="Mot de passe"
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Text.Base style={styles.desc}>Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.</Text.Base>
      <Text.Base style={styles.name}>Confirmer le mot de passe</Text.Base>
      <BaseTextInput
        label="Confirmation du mot de passe"
        placeholder="Confirmation du mot de passe"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
      <Text.Base style={styles.desc}>Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.</Text.Base>
      
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text.Base style={styles.buttonText}>Inscription</Text.Base>
      </TouchableOpacity>
      
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  desc: {
    fontSize: 11,
    color: '#3A3A3A',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonText: {
    color: '#3A3A3A',
    fontSize: 20,
    fontFamily: 'CustomFontBold',
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
});

export default RegistrationForm;
