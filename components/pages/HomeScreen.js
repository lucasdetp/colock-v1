import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';
import { getAuth } from 'firebase/auth';
import { HomeTemplate } from '../templates';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);
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
    const unsubscribe = onSnapshot(
      query(collection(firestoreDB, "chats"), orderBy("_id", "desc")), 
      (querySnapShot) => {
        const chatRooms = querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
        const filteredChats = chatRooms.filter(chat => chat.users.includes(auth.currentUser.uid) && chat.active);
        setChats(filteredChats);
        setIsLoading(false); 
      },
      (error) => {
        console.error("Error fetching chats: ", error);
        setIsLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, [auth.currentUser.uid]);

  const handleMessagePress = (room) => {
    navigation.navigate("Chat", { room });
  };

  return (
    <HomeTemplate 
      chats={chats} 
      isLoading={isLoading} 
      onPressMessage={handleMessagePress} 
      auth={auth} 
    />
  );
};

export default HomeScreen;
