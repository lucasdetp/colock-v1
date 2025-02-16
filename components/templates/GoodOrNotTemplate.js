import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { Container, Text } from '../atoms';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { useNavigation } from 'expo-router';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const GoodOrNotTemplate = ({ svgSource, title }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();

  const wordsList = [
    'Alimentation spécifique', 'Allergie', 'Partage de repas',
    'Alcool', 'Sport dans l\'appart', 'Musique forte',
    'Pratiques religieuses', 'Températures basses', 'Températures élevées',
    'Animaux', 'Fumeurs'
  ];

  const handleOptionChange = (option, isOk) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: isOk ? 'ok' : 'notOk',
    }));
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        const preferencesToSave = Object.keys(selectedOptions).filter(
          option => selectedOptions[option] === 'ok'
        );

        if (preferencesToSave.length > 0) {
          await setDoc(doc(firestoreDB, 'users', user.uid), { preferences: preferencesToSave }, { merge: true });
          setMessage('Préférences enregistrées avec succès !');
        } else {
          setMessage('Aucune préférence sélectionnée.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Erreur lors de l’enregistrement, essayez plus tard.');
    }

    setSaving(false);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const preferences = data.preferences || [];

          const newSelectedOptions = wordsList.reduce((acc, word) => {
            acc[word] = preferences.includes(word) ? 'ok' : 'notOk';
            return acc;
          }, {});

          setSelectedOptions(newSelectedOptions);
        }
      }
    };

    fetchPreferences();
  }, []);

  return (
    <PaperProvider>
      <Container.BasicView style={styles.mainContainer}>

        <Container.BasicView style={styles.headerContainer}>
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <SvgFlecheRetour />
            <SvgXml xml={svgSource} style={styles.image} />
          </TouchableOpacity>
          <Text.Base style={styles.title}>{title}</Text.Base>
        </Container.BasicView>

        <ScrollView style={styles.optionsContainer}>
          <Container.BasicView style={styles.listContainer}>
            <View style={styles.row}>
              <Text.Base style={[styles.headerText, styles.leftText]}>OK</Text.Base>
              <Text.Base style={[styles.headerText, styles.centerText]}>Préférence</Text.Base>
              <Text.Base style={[styles.headerText, styles.rightText]}>Pas OK</Text.Base>
            </View>

            {wordsList.map((word) => (
              <View key={word} style={styles.row}>
                <TouchableOpacity onPress={() => handleOptionChange(word, true)}>
                  <Checkbox
                    status={selectedOptions[word] === 'ok' ? 'checked' : 'unchecked'}
                    color="blue"
                    uncheckedColor="black"
                  />
                </TouchableOpacity>

                <Text.Base style={styles.optionText}>{word}</Text.Base>

                <TouchableOpacity onPress={() => handleOptionChange(word, false)}>
                  <Checkbox
                    status={selectedOptions[word] === 'notOk' ? 'checked' : 'unchecked'}
                    color="red"
                    uncheckedColor="black"
                  />
                </TouchableOpacity>
              </View>
            ))}

          </Container.BasicView>
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences} disabled={saving}>
          <Text.Base style={styles.saveButtonText}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Text.Base>
        </TouchableOpacity>

        {message && (
          <Container.BasicView style={styles.messageContainer}>
            <Text.Base style={styles.messageText}>{message}</Text.Base>
          </Container.BasicView>
        )}

      </Container.BasicView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    padding: 15,
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  optionsContainer: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7790ED',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftText: {
    width: '20%',
    textAlign: 'center',
  },
  centerText: {
    width: '60%',
    textAlign: 'center',
  },
  rightText: {
    width: '20%',
    textAlign: 'center',
  },
  optionText: {
    fontSize: 16,
    width: '60%',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#6A7CFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#28a745',
  },
  messageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GoodOrNotTemplate;
