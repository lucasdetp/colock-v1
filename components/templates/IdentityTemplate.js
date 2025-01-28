import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { SvgXml } from 'react-native-svg';

const IdentityTemplate = ({ svgSource, title }) => {
  const [gender, setGender] = useState(null);
  const [showGender, setShowGender] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setGender(data.gender || null);
          setShowGender(data.showGender || false);
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
          gender,
          showGender,
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
    <PaperProvider>
      <Container.BasicView style={styles.mainContainer}>
        <Container.BasicView style={styles.headerContainer}>
          <SvgXml xml={svgSource} style={styles.image} />
          <Text.Base style={styles.title}>{title}</Text.Base>
        </Container.BasicView>

        <Container.BasicView style={styles.buttonsContainer}>
          {['Homme', 'Femme', 'Autre'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.button, gender === option && styles.buttonActive]}
              onPress={() => setGender(option)}
            >
              <Text.Base style={styles.buttonText}>{option}</Text.Base>
            </TouchableOpacity>
          ))}
        </Container.BasicView>

        <Container.BasicView style={styles.checkboxContainer}>
          <Container.BasicView style={styles.checkBorder}>
            <Checkbox
              status={showGender ? 'checked' : 'unchecked'}
              onPress={() => setShowGender(!showGender)}
              color="blue"
              uncheckedColor="black"
            />
          </Container.BasicView>
          <Text.Base style={styles.checkboxText}>Afficher mon genre sur mon profil</Text.Base>
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
    </PaperProvider>
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
  checkBorder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
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
    padding: 10,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: '#6D6D6D',
    marginLeft: 10,
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

export default IdentityTemplate;
