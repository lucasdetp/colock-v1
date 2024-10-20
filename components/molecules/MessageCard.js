// components/molecules/MessageCard.js
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {TextComponent, ImageComponent} from '../atoms';
import { FontAwesome5 } from '@expo/vector-icons';

const MessageCard = ({ room, auth, onPress }) => {
  const otherUserId = room.users.find(uid => uid !== auth.currentUser.uid);
  const otherUserFullName = room.userFullName[room.users.indexOf(otherUserId)];
  const otherUserProfilePic = room.otherUserProfilePic || "N/A"; // Remplacez cela par votre logique

  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 10 }}>
      <View style={{ marginRight: 10 }}>
        {otherUserProfilePic !== "N/A" ? (
          <ImageComponent uri={otherUserProfilePic} />
        ) : (
          <FontAwesome5 name="users" size={24} color="#555" />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <TextComponent style={{ fontWeight: 'bold' }}>{otherUserFullName}</TextComponent>
        <TextComponent>{room.lastMessage?.substring(0, 25)}{room.lastMessage?.length > 25 && '...'}</TextComponent>
      </View>
      <TextComponent style={{ marginLeft: 10 }}>{room.timeStamp ? calculateElapsedTime(room.timeStamp) : ''}</TextComponent>
    </TouchableOpacity>
  );
};

export default MessageCard;
