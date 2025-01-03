import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { flecheBas, flecheHaut } from '../../assets';
import { SvgXml } from 'react-native-svg';

const AboutMe = ({ svgSource, title, percentage }) => {
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <SvgXml xml={svgSource} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.percentageCircle}>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      </View>

      {/* Container pour les boutons et les formulaires */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            showPersonalForm && styles.buttonActive,
          ]}
          onPress={() => setShowPersonalForm(!showPersonalForm)}
        >
          <Text style={styles.buttonText}>
            Nom, prénom, date de naissance...
          </Text>
          <Image
            source={showPersonalForm ? flecheHaut : flecheBas}
            style={styles.arrow}
          />
        </TouchableOpacity>

        {/* Formulaire déroulant : Informations personnelles */}
        {showPersonalForm && (
          <View style={styles.form}>
            <TextInput placeholder="Prénom" style={styles.input} />
            <TextInput placeholder="Nom" style={styles.input} />
            <TextInput
              placeholder="Âge"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput placeholder="Adresse de facturation" style={styles.input} />
          </View>
        )}

        {/* Espacement entre les boutons */}
        <View style={styles.spacer} />

        {/* Bouton pour les informations de paiement */}
        <TouchableOpacity
          style={[
            styles.button,
            showPaymentForm && styles.buttonActive,
          ]}
          onPress={() => setShowPaymentForm(!showPaymentForm)}
        >
          <Text style={styles.buttonText}>Info de paiement</Text>
          <Image
            source={showPaymentForm ? flecheHaut : flecheBas} 
            style={styles.arrow}
          />
        </TouchableOpacity>

        {/* Formulaire déroulant : Informations de paiement */}
        {showPaymentForm && (
          <View style={styles.form}>
            <TextInput placeholder="Nom sur la carte" style={styles.input} />
            <TextInput
              placeholder="Numéro de carte"
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="CCV"
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,  
    width: '90%', 
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  percentageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#7790ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b6b6b',
  },
  buttonsContainer: {
    width: '90%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonActive: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#6D6D6D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    width: 30,
    height: 17,
    tintColor: '#6D6D6D',
  },
  form: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  spacer: {
    marginVertical: 20,
  },
});

export default AboutMe;
