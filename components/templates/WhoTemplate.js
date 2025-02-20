import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { Container, Text } from '../atoms';
import SvgFlecheBleu from '@/assets/svg/flecheBleu';

const WhoTemplate = ({ navigateToNextStep, saveUserData }) => {
  const [gender, setGender] = useState(null);
  const [showGender, setShowGender] = useState(false); 
  const [lookingFor, setLookingFor] = useState(null); 

  const handleNextStep = () => {
    if (saveUserData) {
      saveUserData({ gender, showGender, lookingFor });
    }
    navigateToNextStep();
  };

  return (
    <PaperProvider>
      <Container.BasicView style={styles.container}>
        <Text.Base style={styles.title}>Tu es ...</Text.Base>

        <Container.BasicView style={styles.checkboxContainer}>
          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={gender === 'Femme' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Femme')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Femme</Text.Base>
          </Container.BasicView>

          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={gender === 'Homme' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Homme')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Homme</Text.Base>
          </Container.BasicView>

          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={gender === 'Autre' ? 'checked' : 'unchecked'}
                onPress={() => setGender('Autre')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Autre</Text.Base>
          </Container.BasicView>
        </Container.BasicView>

        <Container.BasicView style={styles.checkItem}>
          <Container.BasicView style={styles.checkBorderCarre}>
            <Checkbox
              status={showGender ? 'checked' : 'unchecked'}
              onPress={() => setShowGender(!showGender)}
              color="green"
              uncheckedColor="black"
            />
          </Container.BasicView>
          <Text.Base style={styles.checkboxText}>Afficher mon genre sur mon profil</Text.Base>
        </Container.BasicView>

        <Text.Base style={styles.title}>Tu cherches ...</Text.Base>

        <Container.BasicView style={styles.checkboxContainer}>
          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={lookingFor === 'Femme' ? 'checked' : 'unchecked'}
                onPress={() => setLookingFor('Femme')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Femme</Text.Base>
          </Container.BasicView>

          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={lookingFor === 'Homme' ? 'checked' : 'unchecked'}
                onPress={() => setLookingFor('Homme')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Homme</Text.Base>
          </Container.BasicView>

          <Container.BasicView style={styles.checkItem}>
            <Container.BasicView style={styles.checkBorder}>
              <Checkbox
                status={lookingFor === 'Peu importe' ? 'checked' : 'unchecked'}
                onPress={() => setLookingFor('Peu importe')}
                color="blue"
                uncheckedColor="black"
              />
            </Container.BasicView>
            <Text.Base style={styles.checkboxText}>Peu importe</Text.Base>
          </Container.BasicView>
        </Container.BasicView>

        <TouchableOpacity onPress={handleNextStep} style={styles.button}>
          <Text.Base style={styles.buttonText}>Valider 2/5</Text.Base>
          <SvgFlecheBleu />
        </TouchableOpacity>
      </Container.BasicView>
    </PaperProvider>
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
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  checkItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 10, 
  },
  checkBorder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
  },
  checkBorderCarre: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  checkboxText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,
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

export default WhoTemplate;
