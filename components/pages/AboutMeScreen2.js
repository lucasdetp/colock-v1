import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AboutMe2Template from '../templates/AboutMe2Template';
import { useNavigation } from 'expo-router';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const aboutMeData = [
  {
    svgSource: `
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.91" d="M24.3222 24.1503C28.7975 22.3331 31.9796 17.8049 31.9796 12.5013C31.9796 5.61138 26.6081 0 20 0C13.3919 0 8.02042 5.61138 8.02042 12.5013C8.02042 17.8049 11.2082 22.3331 15.6778 24.1503C6.7215 26.222 0 34.5621 0 44.5182C0 48.6438 3.21611 52 7.1696 52H32.8304C36.7839 52 40 48.6438 40 44.5182C40 34.5562 33.2785 26.222 24.3222 24.1503Z" fill="#7790ED"/>
        </svg>
    `,
    title: 'A propos de toi',
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
