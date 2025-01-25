// LikesScreen.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LikesTemplate from '../templates/LikesTemplate';
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';

const LikesScreen = () => {
  const navigation = useNavigation();

  const navigateToNextStep = async (userId) => {
    try {
      navigation.navigate('AddPictureScreen', { userId: userId });
    } catch (error) {
      console.error('Erreur lors de la navigation :', error.message);
    }
  };

  const saveLoisirsData = async (podium) => {
    try {
      const userId = firebaseAuth.currentUser.uid;
      await setDoc(
        doc(firestoreDB, 'users', userId),
        {
          loisirs: podium.filter(item => item !== null),
        },
        { merge: true }
      );
      navigateToNextStep(userId); 
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des loisirs :', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LikesTemplate 
        navigateToNextStep={navigateToNextStep} 
        saveLoisirsData={saveLoisirsData} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default LikesScreen;
