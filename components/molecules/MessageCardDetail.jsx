import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Image, Container } from '../atoms';
import { FontAwesome5 } from '@expo/vector-icons';
import SvgMessageFull from '@/assets/svg/messageFull';

const MessageCardDetail = ({ room, city, auth, onPressProfile, onPressMessage }) => {
    return (
      <TouchableOpacity 
        onPress={onPressProfile}
        style={{ flexDirection: 'row', padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 13 }}
      >
        <Container.BasicView style={{ marginRight: 10 }}>
          {room.profilePic !== "N/A" ? (
            <Image.Base uri={room.profilePic} />
          ) : (
            <FontAwesome5 name="users" size={24} color="#555" />
          )}
        </Container.BasicView>
  
        <Container.BasicView style={{ flex: 1 }}>
          <Text.Base style={{ fontWeight: 'bold', fontSize: 20 }}>{room.name}</Text.Base>
          <Text.Base style={{ fontSize: 16 }}>{city}</Text.Base>
        </Container.BasicView>
  
        {/* TODO: si utilisateurs a deja un chats avec l'user save alors afficher le btn msg */}
        {/* <TouchableOpacity 
          onPress={onPressMessage}
          style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <SvgMessageFull />
          <Text.Base style={{ marginLeft: 8 }}>Message</Text.Base>
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  
export default MessageCardDetail;