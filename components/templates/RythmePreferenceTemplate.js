import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { Container, Image, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { useNavigation } from 'expo-router';

const RythmePreferenceTemplate = ({ svgSource, title }) => {
  const [rythme, setRythme] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRythme(data?.rythme || null);
        }
      }
    };
    
    fetchUserData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setMessageType(null);

    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        await setDoc(doc(firestoreDB, 'users', user.uid), {
          rythme,
        }, { merge: true });

        setMessage('Enregistré avec succès');
        setMessageType('success');

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Un problème est survenu, essayez plus tard');
      setMessageType('error');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    setSaving(false);
  };

  return (
      <Container.BasicView style={styles.mainContainer}>
        <Container.BasicView style={styles.headerContainer}>
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <SvgFlecheRetour />
            <SvgXml xml={svgSource} style={styles.image} />
          </TouchableOpacity>
          <Text.Base style={styles.title}>{title}</Text.Base>
        </Container.BasicView>

        <Container.BasicView style={styles.mainContainer}> 
            <Image.Local source={require('../../assets/images/rythme.jpg')} />
            <Text.Base style={styles.desc}>Clique sur le tags qui correspond au moment où tu est le plus active ou actif de la journée.</Text.Base>
        </Container.BasicView>

        <Container.BasicView style={styles.buttonsContainer}>
          {['Matin', 'Aprèm', 'Soirée', 'Nuit'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.button, rythme === option && styles.buttonActive]}
              onPress={() => setRythme(option)}
            >
              <Text.Base style={styles.buttonText}>{option}</Text.Base>
            </TouchableOpacity>
          ))}
        </Container.BasicView>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          <Text.Base style={styles.saveButtonText}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Text.Base>
        </TouchableOpacity>

        {/* Affichage du message de succès ou d'erreur */}
        {message && (
          <Container.BasicView
            style={[
              styles.messageContainer,
              messageType === 'success' ? styles.successMessage : styles.errorMessage,
            ]}
          >
            <Text.Base style={styles.messageText}>{message}</Text.Base>
          </Container.BasicView>
        )}
      </Container.BasicView>
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
    width: '100%',
    backgroundColor: '#fff',
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  desc: {
    fontSize: 15,
    color: '#6D6D6D',
    textAlign: 'left',
    marginBottom: 20,
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
    fontFamily: "CustomFontBoldLight",
    marginLeft: 10,
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 5,
    flex: 1,
  },
  buttonActive: {
    borderColor: '#7790ED',
  },
  buttonText: {
    color: '#6D6D6D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#C9DDFC',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 20,
    width: '55%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
    fontFamily: "CustomFontBold",
    textAlign: 'center',
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  successMessage: {
    backgroundColor: '#28a745',
  },
  errorMessage: {
    backgroundColor: '#dc3545',
  },
  messageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RythmePreferenceTemplate;
