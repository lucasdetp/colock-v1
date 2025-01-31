import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';
import { getAuth } from 'firebase/auth';
import { SaveTemplate } from '../templates';
import { Text, View } from 'react-native';

const SaveScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const auth = getAuth();
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  useEffect(() => {
    const userSwipeSaveRef = doc(firestoreDB, "swipeSave", auth.currentUser.uid);

    const unsubscribe = onSnapshot(userSwipeSaveRef, async (userSwipeSaveSnap) => {
      if (userSwipeSaveSnap.exists()) {
        const savedUsers = userSwipeSaveSnap.data();
        const profilesList = [];

        await Promise.all(
          Object.keys(savedUsers).map(async (userId) => {
            const userRef = doc(firestoreDB, "users", userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              profilesList.push({
                id: userId,
                name: userSnap.data().fullName || "Inconnu",
                profilePic: userSnap.data().profilePic || "",
                city: userSnap.data().citySearch || "Non spécifié",
              });
            }
          })
        );

        setProfiles(profilesList);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();

  }, [auth.currentUser.uid]);

  const handleProfilePress = async (profile) => {
    const userId = profile.id;

    if (!userId) return;

    try {
      const userRef = doc(firestoreDB, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        navigation.navigate("SwipePlusScreen", { 
          name: userData.fullName || "Inconnu",
          profilePic: userData.profilePic || "",
          profilePic2: userData.profilePic2 || "",
          profilePic3: userData.profilePic3 || "",
          dateDispo: userData.dateDispo || "Non spécifié",
          location: userData.citySearch || "Non spécifié",
          carac2: userData.loisirs?.[0] || "Non spécifié",
          carac3: userData.loisirs?.[1] || "Non spécifié",
          bio: userData.bio || "Aucune bio",
        });
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  };

  return (
    <SaveTemplate 
      chats={profiles} 
      isLoading={isLoading} 
      onProfilePress={handleProfilePress} 
      auth={auth} 
    />
  );
};

export default SaveScreen;
