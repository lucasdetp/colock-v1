import React from 'react';
import { SafeAreaView } from 'react-native';
import { ProfileSave } from '../organims';
import { Container } from '../atoms';

const SaveTemplate = ({ chats, isLoading, onProfilePress, auth }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container.BasicScrollView>
        <Container.BasicView style={{ padding: 10 }}>
          <ProfileSave 
            chats={chats} 
            isLoading={isLoading} 
            onProfilePress={onProfilePress}
            auth={auth} 
          />
        </Container.BasicView>
      </Container.BasicScrollView>
    </SafeAreaView>
  );
};

export default SaveTemplate;
