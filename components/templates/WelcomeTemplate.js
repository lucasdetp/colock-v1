import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text } from '../atoms';
import { Picker } from '@react-native-picker/picker';
import SvgFlecheBleu from '../../assets/svg/flecheBleu';

const WelcomeTemplate = ({ navigateToNextStep, saveBirthdate }) => {
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2000');

  const handleSubmit = () => {
    const birthdate = `${year}-${month}-${day}`;
    console.log(`Date de naissance: ${birthdate}`);

    saveBirthdate(birthdate);

    navigateToNextStep();
  };

  const generateDays = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <Picker.Item key={i} label={`${i < 10 ? '0' : ''}${i}`} value={`${i < 10 ? '0' : ''}${i}`} />
      );
    }
    return days;
  };

  const generateMonths = () => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months.map((month, index) => (
      <Picker.Item key={index} label={month} value={`${index + 1 < 10 ? '0' : ''}${index + 1}`} />
    ));
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i >= 1900; i--) {
      years.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
    }
    return years;
  };

  return (
    <Container.BasicView style={styles.container}>
      <Text.Base style={styles.title}>Bienvenue sur Colock</Text.Base>

      <Text.Base style={styles.subtitle}>
        Prêt à rencontrer ton ou ta futur·e coloc ?{'\n'}{'\n'}
        Réponds à trois questions essentielles et commence à rencontrer des gens :
      </Text.Base>

      <Text.Base style={styles.birthdate}>Date de naissance</Text.Base>

      <View style={styles.pickerRow}>
        {/* Sélecteur Jour */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={day}
            style={styles.picker}
            itemStyle={{ backgroundColor: "transparent", color: "black", fontSize:17 }}
            onValueChange={(itemValue) => setDay(itemValue)}
          >
            {generateDays()}
          </Picker>
        </View>

        {/* Sélecteur Mois */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={month}
            style={styles.picker}
            itemStyle={{ backgroundColor: "transparent", color: "black", fontSize:17 }}
            onValueChange={(itemValue) => setMonth(itemValue)}
          >
            {generateMonths()}
          </Picker>
        </View>

        {/* Sélecteur Année */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={year}
            style={styles.picker}
            itemStyle={{ backgroundColor: "transparent", color: "black", fontSize:17 }}
            onValueChange={(itemValue) => setYear(itemValue)}
          >
            {generateYears()}
          </Picker>
        </View>
      </View>

      {/* Bouton pour passer à la prochaine étape */}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text.Base style={styles.buttonText}>Valider 1/5</Text.Base>
        <SvgFlecheBleu />
      </TouchableOpacity>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#3A3A3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 40,
  },
  birthdate: {
    fontSize: 20,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',  
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  pickerContainer: {
    width: '30%', 
    marginHorizontal: 5, 
  },
  picker: {
    height: 200, 
    width: '100%',
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
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
  },
  buttonText: {
    color: '#3A3A3A',
    fontSize: 20,
    fontFamily: 'CustomFontBold',
  },
});

export default WelcomeTemplate;
