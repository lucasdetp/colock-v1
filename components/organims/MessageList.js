// components/organisms/MessageList.js
import React, { useEffect } from 'react';
import { MessageCard } from '../molecules';
import { Text, Container } from '../atoms';
import SvgMessageFull from '../../assets/svg/messageFull';
import { useLoader } from '@/context/LoaderContext';

const MessageList = ({ chats, isLoading, onPressMessage, auth, room }) => {
  const { setLoading } = useLoader();
    useEffect(() => {
      if (isLoading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [isLoading, setLoading]);

  if (!chats || chats.length === 0) {
    return (
      <Container.BasicView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Container.BasicView style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', gap: 10 }}>
          <SvgMessageFull />
          <Text.Base style={{ fontWeight: '500', fontSize: 22, fontFamily: "CustomFontBold", }}>Messages</Text.Base>
        </Container.BasicView>
        <Text.Base style={{ textAlign: 'center', fontFamily: "CustomFont", fontSize: 18 }}>
          Pas encore d'amis
        </Text.Base>
      </Container.BasicView>
    );
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
