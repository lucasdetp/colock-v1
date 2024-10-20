import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';
import { getAuth } from 'firebase/auth';
import { HomeTemplate } from '../templates';
import { Text, View } from 'react-native'; // Assurez-vous d'importer Text et View

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const auth = getAuth();
  const navigation = useNavigation();

  // Affichez un écran de chargement si l'utilisateur n'est pas encore défini
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    ); 
  }

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestoreDB, "chats"), orderBy("_id", "desc")), (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data());
      const filteredChats = chatRooms.filter(chat => chat.users.includes(auth.currentUser.uid) && chat.active);
      setChats(filteredChats);
      setIsLoading(false); // Mettez à jour le chargement uniquement lorsque les chats sont chargés
    });
    
    return unsubscribe;
  }, [auth.currentUser.uid]); // Ajoutez auth.currentUser.uid comme dépendance

  const handleMessagePress = (room) => {
    navigation.navigate("ChatScreen", { room });
  };

  return (
    <HomeTemplate chats={chats} isLoading={isLoading} onPressMessage={handleMessagePress} />
  );
};

export default HomeScreen;
