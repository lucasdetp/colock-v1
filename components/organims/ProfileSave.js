import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { MessageCardDetail } from '../molecules';
import { Text, Container } from '../atoms';
import SvgCoeurFull from '../../assets/svg/coeurFull';
import { useLoader } from '@/context/LoaderContext';

const ProfileSave = ({ chats, isLoading, onProfilePress, auth }) => {
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
      <Container.BasicView style={{ flex: 1 }}>
        <Container.BasicView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            padding: 10,
          }}
        >
          <SvgCoeurFull />
          <Text.Base style={{ fontWeight: '400', fontSize: 22, fontFamily: 'CustomFontBold' }}>
            Profils enregistrés
          </Text.Base>
        </Container.BasicView>

        <Container.BasicView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <Text.Base
            style={{
              textAlign: 'center',
              fontFamily: 'CustomFontBold',
              fontSize: 18,
            }}
          >
            Vous n'avez pas de profil enregistré !
          </Text.Base>
        </Container.BasicView>
      </Container.BasicView>
    );
  }

  // Si des profils sont présents
  return (
    <Container.BasicView style={{ flex: 1 }}>
      {/* Affichage du titre avec le SVG en haut */}
      <Container.BasicView
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <SvgCoeurFull />
        <Text.Base style={{ fontWeight: '400', fontSize: 22, fontFamily: 'CustomFontBold' }}>
          Profils enregistrés
        </Text.Base>
      </Container.BasicView>

      {/* Affichage des profils */}
      {chats
        .sort((a, b) => b.timeStamp?.seconds - a.timeStamp?.seconds)
        .map((profile) => (
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
