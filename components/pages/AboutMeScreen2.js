import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AboutMe2Template from '../templates/AboutMe2Template';
import { useNavigation } from 'expo-router';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const aboutMeData = [
  {
    svgSource: `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 20 16" fill="none">
        <path opacity="0.91" d="M18.2995 4.96903C18.2637 4.09992 17.9155 3.24701 17.2521 2.58498L17.2517 2.5846C15.8714 1.20581 13.5663 1.23759 12.1328 2.65717C12.1327 2.65721 12.1327 2.65724 12.1327 2.65727L10.7136 4.06475L10.0042 4.76833L9.29999 4.05956L7.80882 2.55872L7.80728 2.55717C7.11475 1.8571 6.20248 1.50459 5.28529 1.50004C4.3693 1.4955 3.45427 1.84004 2.75548 2.5343L2.75471 2.53506C1.35409 3.9236 1.3432 6.18385 2.73187 7.58649C2.73189 7.58651 2.73191 7.58653 2.73193 7.58656C2.73203 7.58665 2.73212 7.58674 2.73221 7.58684L9.32091 14.2336L18.2995 4.96903ZM18.2995 4.96903L18.2987 5.12913C18.2942 6.04567 17.9421 6.95668 17.2408 7.65189L10.596 14.2387C10.5959 14.2388 10.5958 14.2389 10.5957 14.239C10.2413 14.5894 9.67124 14.5863 9.32125 14.2339L18.2995 4.96903Z" stroke="#7790ED" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
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
