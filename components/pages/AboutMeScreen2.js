import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AboutMe2Template from '../templates/AboutMe2Template';
import { useNavigation } from 'expo-router';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const aboutMeData = [
  {
    svgSource: `
     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="26" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="64ae96984b"><path d="M 16.160156 27.785156 L 358.855469 27.785156 L 358.855469 347.1875 L 16.160156 347.1875 Z M 16.160156 27.785156 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#64ae96984b)"><path fill="#7790ed" d="M 187.511719 63.023438 C 193.386719 55.722656 199.71875 49.503906 206.867188 44.351562 C 222.203125 33.304688 240.0625 27.777344 263.351562 27.777344 C 289.292969 27.777344 312.90625 37.367188 330.109375 52.867188 C 347.867188 68.871094 358.859375 91.105469 358.859375 115.773438 C 358.859375 155.175781 338.058594 193.300781 306.851562 230.785156 C 277.269531 266.324219 238.957031 300.839844 200.648438 335.347656 L 187.511719 347.1875 L 174.371094 335.347656 C 136.0625 300.839844 97.753906 266.324219 68.167969 230.785156 C 36.960938 193.300781 16.160156 155.175781 16.160156 115.773438 C 16.160156 91.105469 27.152344 68.871094 44.910156 52.867188 C 62.113281 37.367188 85.734375 27.777344 111.667969 27.777344 C 134.957031 27.777344 152.816406 33.304688 168.152344 44.351562 C 175.300781 49.503906 181.636719 55.722656 187.511719 63.023438 Z M 229.765625 76.164062 C 220.601562 82.769531 212.789062 93.535156 204.644531 108.214844 L 187.511719 139.09375 L 170.375 108.214844 C 162.230469 93.535156 154.421875 82.769531 145.253906 76.164062 C 136.886719 70.132812 126.296875 67.117188 111.667969 67.117188 C 95.746094 67.117188 81.4375 72.832031 71.1875 82.0625 C 61.5 90.796875 55.5 102.726562 55.5 115.773438 C 55.5 144.695312 72.617188 174.894531 98.289062 205.738281 C 122.398438 234.695312 154.488281 264.453125 187.511719 294.296875 C 220.53125 264.453125 252.628906 234.695312 276.730469 205.738281 C 302.40625 174.894531 319.523438 144.695312 319.523438 115.773438 C 319.523438 102.726562 313.527344 90.796875 303.832031 82.0625 C 293.582031 72.832031 279.28125 67.117188 263.351562 67.117188 C 248.722656 67.117188 238.132812 70.132812 229.765625 76.164062 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
    `,
    title: 'A propos de moi',
    percentage: 8,
  }
];

const AboutMeScreen2 = () => {
  const navigation = useNavigation();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [userData, setUserData] = useState(null);
  const user = firebaseAuth.currentUser;

  const infoBoxData = [
    {
      text: 'Tu te définis comme ...',
      onPress: () => navigation.navigate('IdentityScreen'),
    },
    {
      svgSource: ``,
      text: 'Niveau rythme, tu es plutôt ...',
      onPress: () => navigation.navigate('RythmePreferenceScreen'),
    },
    {
      text: 'Tes 3 traits de caractères principaux',
      onPress: () => navigation.navigate('PrincipalCaractereScreen'),
    },
  ];

  const calculateCompletionPercentage = () => {
    if (userData) {
      let filledFields = 0;
      const totalFields = 6;

      if (userData?.showGender !== undefined) filledFields++;
      if (userData?.rythme !== undefined) filledFields++;

      if (userData?.traitsCaracterePrincipaux?.[0] !== null) filledFields++;
      if (userData?.traitsCaracterePrincipaux?.[1] !== null) filledFields++;
      if (userData?.traitsCaracterePrincipaux?.[2] !== null) filledFields++;

      if (userData?.gender !== undefined) filledFields++;

      const percentage = Math.round((filledFields / totalFields) * 100);
      setCompletionPercentage(percentage);
    }
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestoreDB, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      calculateCompletionPercentage();
    }
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {aboutMeData.map((item, index) => (
          <AboutMe2Template 
            key={index}
            svgSource={item.svgSource}
            title={item.title}
            percentage={completionPercentage}
            infoBoxData={infoBoxData}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default AboutMeScreen2;
