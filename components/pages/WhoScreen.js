import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WhoTemplate from '../templates/WhoTemplate';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

const WhoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToNextStep = () => {
    navigation.navigate('WhereScreen');
  };

  const saveUserData = async ({ gender, showGender, lookingFor }) => {
    try {
      const userId = firebaseAuth.currentUser.uid;

      await setDoc(
        doc(firestoreDB, 'users', userId),
        {
          gender: gender,
          showGender: showGender,
          lookingFor: lookingFor,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WhoTemplate navigateToNextStep={navigateToNextStep} saveUserData={saveUserData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default WhoScreen;
