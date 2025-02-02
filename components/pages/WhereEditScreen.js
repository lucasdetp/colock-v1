import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import WhereEditTemplate from '../templates/WhereEditTemplate';

const WhereEditScreen = () => {
  const [city, setCity] = useState('');

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

  const headerData = {
    title: 'Où cherches-tu ...', 
    svgSource: `
      <svg width="36" height="36" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.1603 13.8226L12.1785 10.8408C12.9931 9.75903 13.4755 8.41563 13.4755 6.9609C13.4755 3.39831 10.5772 0.5 7.01461 0.5C3.45202 0.5 0.553711 3.39831 0.553711 6.9609C0.553711 10.5235 3.45202 13.4218 7.01461 13.4218C8.41553 13.4218 9.71068 12.9728 10.7702 12.212L13.7706 15.2124C13.9617 15.4035 14.214 15.5 14.4645 15.5C14.715 15.5 14.9674 15.4035 15.1585 15.2124C15.5426 14.8283 15.5426 14.2067 15.1585 13.8226H15.1603ZM7.01461 11.455C4.53564 11.455 2.5187 9.43802 2.5187 6.95905C2.5187 4.48007 4.53564 2.46313 7.01461 2.46313C9.49359 2.46313 11.5105 4.48007 11.5105 6.95905C11.5105 9.43802 9.49359 11.455 7.01461 11.455Z" fill="#7790ED"/>
        <path d="M7.66441 8.81139V6.15984C7.63843 5.90935 7.41578 5.66997 7.16528 5.63472C6.98159 5.60874 6.44906 5.60874 6.26536 5.63472C5.70129 5.71079 5.55283 6.52539 6.04454 6.81485C6.13546 6.86866 6.37668 6.90019 6.39338 6.94844C6.40266 7.45499 6.39339 7.96154 6.3971 8.4681C6.39895 8.80023 6.35071 9.32349 6.3971 9.6278C6.43235 9.85231 6.7014 10.0935 6.92592 10.1251C7.14672 10.1548 7.75162 10.1511 7.94645 10.0639C7.97057 10.0527 7.9947 10.036 7.9947 10.036C8.05407 9.99891 8.13014 9.95066 8.19323 9.86902C8.23219 9.81892 8.2526 9.77439 8.26374 9.74841C8.45857 9.27525 8.12643 8.88373 7.66069 8.81322L7.66441 8.81139Z" fill="#7790ED"/>
        <path d="M6.92598 4.96656C7.94837 5.07603 7.90569 3.52855 6.87216 3.70668C6.22273 3.81801 6.23202 4.89234 6.92598 4.96656Z" fill="#7790ED"/>
      </svg>  `,
  };

  return (
    <SafeAreaView style={styles.container}>
      <WhereEditTemplate 
        headerData={headerData}  
        saveCityData={saveCityData} 
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

export default WhereEditScreen;
