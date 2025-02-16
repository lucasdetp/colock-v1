// components/molecules/MessageCard.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Text, Image, Container} from '../atoms';
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '@/config/firebase.config';

const MessageCard = ({ room, auth, onPress }) => {
  const [otherUserProfilePic, setOtherUserProfilePic] = useState("N/A");

  const otherUserId = room.users.find(uid => uid !== auth.currentUser.uid);
  const otherUserFullName = room.userFullName[room.users.indexOf(otherUserId)];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const otherUserDoc = await getDoc(doc(firestoreDB, "users", otherUserId));
        if (otherUserDoc.exists()) {
          setOtherUserProfilePic(otherUserDoc.data().profilePic || "N/A");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchUserProfile();
  }, [otherUserId]);

  const calculateElapsedTime = (timeStamp) => {
    if (!timeStamp) return "N/A";
    
    const currentTime = new Date();
    const messageTime = new Date(timeStamp.seconds * 1000);
    const timeDifference = Math.floor((currentTime.getTime() - messageTime.getTime()) / 1000); 
    
    if (timeDifference < 60) {
      return "à l'instant";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} min`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} h`;
    } else {
      const days = Math.floor(timeDifference / 86400);
      return `${days} j`;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Container.BasicView style={{ marginRight: 10 }}>
        {otherUserProfilePic !== "N/A" ? (
          <Image.Base uri={otherUserProfilePic} />
        ) : (
          <FontAwesome5 name="users" size={24} color="#555" />
        )}
      </Container.BasicView>
      <Container.BasicView style={{ flex: 1 }}>
        <Text.Base style={{ fontWeight: 'bold', fontSize: 20,  fontFamily: "FilsonProMedium", }}>{otherUserFullName}</Text.Base>
        <Text.Base style={{fontSize: 16}}>{room.lastMessage?.substring(0, 25)}{room.lastMessage?.length > 25 && '...'}</Text.Base>
      </Container.BasicView>
      <Text.Base style={{ marginLeft: 10 }}>{room.timeStamp ? calculateElapsedTime(room.timeStamp) : ''}</Text.Base>
    </TouchableOpacity>
  );
};

export default MessageCard;
