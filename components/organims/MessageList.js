// components/organisms/MessageList.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MessageCard } from '../molecules';
import { Text, Container } from '../atoms';
import SvgMessageFull from '../../assets/svg/messageFull';

const MessageList = ({ chats, isLoading, onPressMessage, auth, room }) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#6d24a5" />;
  }

  if (!chats || chats.length === 0) {
    return <Text.Base style={{ textAlign: 'center' }}>Pas encore d'amis</Text.Base>;
  }

  return (
    <Container.BasicView>
      <Container.BasicView style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', gap: 10 }}>
        <SvgMessageFull />
        <Text.Base style={{ fontWeight: '500', fontSize: 22, fontFamily: "CustomFontBold", }}>Messages</Text.Base>
      </Container.BasicView>
      {chats.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds).map(room => (
        <MessageCard 
          key={room._id} 
          room={room} 
          auth={auth} 
          onPress={() => onPressMessage(room)} 
        />
      ))}
    </Container.BasicView>
  );
};

export default MessageList;
