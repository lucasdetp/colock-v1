import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WelcomeTemplate from '../templates/WelcomeTemplate';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToNextStep = () => {
    navigation.navigate('WhoScreen');
  };

  const saveBirthdate = async (birthdate) => {
    try {
      const userId = firebaseAuth.currentUser.uid;

      await setDoc(doc(firestoreDB, 'users', userId), {
        birthdate: birthdate,
      }, { merge: true });

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la date de naissance :', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeTemplate navigateToNextStep={navigateToNextStep} saveBirthdate={saveBirthdate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default WelcomeScreen;
