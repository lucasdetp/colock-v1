// components/molecules/MessageCard.js
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Text, Image} from '../atoms';
import { FontAwesome5 } from '@expo/vector-icons';

const MessageCard = ({ room, auth, onPress }) => {
  const otherUserId = room.users.find(uid => uid !== auth.currentUser.uid);
  const otherUserFullName = room.userFullName[room.users.indexOf(otherUserId)];
  const otherUserProfilePic = room.otherUserProfilePic || "N/A"; 

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
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 10 }}>
      <View style={{ marginRight: 10 }}>
        {otherUserProfilePic !== "N/A" ? (
          <Image.Base uri={otherUserProfilePic} />
        ) : (
          <FontAwesome5 name="users" size={24} color="#555" />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text.Base style={{ fontWeight: 'bold' }}>{otherUserFullName}</Text.Base>
        <Text.Base>{room.lastMessage?.substring(0, 25)}{room.lastMessage?.length > 25 && '...'}</Text.Base>
      </View>
      <Text.Base style={{ marginLeft: 10 }}>{room.timeStamp ? calculateElapsedTime(room.timeStamp) : ''}</Text.Base>
    </TouchableOpacity>
  );
};

export default MessageCard;
