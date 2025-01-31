import React from 'react';
import { ActivityIndicator } from 'react-native';
import { MessageCardDetail } from '../molecules';
import { Text, Container } from '../atoms';
import SvgCoeurFull from '../../assets/svg/coeurFull';

const ProfileSave = ({ chats, isLoading, onProfilePress, auth }) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#6d24a5" />;
  }

  if (!chats || chats.length === 0) {
    return <Text.Base style={{ textAlign: 'center' }}>Vous n'avez pas de profile enregistré !</Text.Base>;
  }

  return (
    <Container.BasicView>
      <Container.BasicView style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', gap: 10 }}>
        <SvgCoeurFull />
        <Text.Base style={{ fontWeight: '500', fontSize: 22 }}>Profils enregistrés</Text.Base>
      </Container.BasicView>
      {chats.sort((a, b) => b.timeStamp?.seconds - a.timeStamp?.seconds).map((profile) => (
        <MessageCardDetail
          key={profile.id}
          room={profile}
          city={profile.city}
          auth={auth}
          onPressProfile={() => onProfilePress(profile)}
          onPressMessage={() => {}}
        />
      ))}
    </Container.BasicView>
  );
};

export default ProfileSave;
