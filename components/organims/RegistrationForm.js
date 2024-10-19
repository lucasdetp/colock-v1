import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import FormField from '../molecules/FormField';
import {Button} from '../atoms';

const RegistrationForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
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
      <View style={styles.switchContainer}>
        <Switch value={coloc} onValueChange={toggleSwitch} />
        <Text style={styles.switchText}>Je recherche un colocataire</Text>
      </View>
      <Button.Base title="S'inscrire" onPress={handleRegister} />
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
});

export default RegistrationForm;
