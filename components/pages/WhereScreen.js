import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import WhereTemplate from '../templates/WhereTemplate';

const WhereScreen = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');

  const navigateToNextStep = () => {
    navigation.navigate('LikesScreen');
  };

  const saveCityData = async (cityName) => {
    setCity(cityName);
    try {
      const userId = firebaseAuth.currentUser.uid;
      await setDoc(
        doc(firestoreDB, 'users', userId),
        {
          citySearch: cityName,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la ville :', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WhereTemplate navigateToNextStep={navigateToNextStep} saveCityData={saveCityData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default WhereScreen;
