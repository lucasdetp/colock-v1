import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FormField from '../molecules/FormField';
import { Text} from '../atoms';

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
    <View style={styles.container}>
      <FormField
        label="Prénom"
        placeholder="Prénom"
        onChangeText={setName}
      />
      <FormField
        label="Nom"
        placeholder="Nom"
        onChangeText={setLastName}
      />
      <FormField
        label="Email"
        placeholder="Email"
        onChangeText={setEmail}
      />
      <FormField
        label="Mot de passe"
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <FormField
        label="Confirmation du mot de passe"
        placeholder="Confirmation du mot de passe"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text.Base style={styles.buttonText}>Inscription</Text.Base>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonText: {
    color: '#3A3A3A',
    fontSize: 20,
    fontWeight: '600',
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
  },
});

export default RegistrationForm;
