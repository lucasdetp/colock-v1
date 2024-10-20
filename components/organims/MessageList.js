// components/organisms/MessageList.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MessageCard } from '../molecules';
import { Text } from '../atoms';

const MessageList = ({ chats, isLoading, onPressMessage, auth }) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#6d24a5" />;
  }

  if (!chats || chats.length === 0) {
    return <Text.Base style={{ textAlign: 'center' }}>Pas encore d'amis</Text.Base>;
  }

  return (
    <View>
      {chats.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds).map(room => (
        <MessageCard 
          key={room._id} 
          room={room} 
          auth={auth} 
          onPress={() => onPressMessage(room)} 
        />
      ))}
    </View>
  );
};

export default MessageList;
