// components/molecules/ProfileCard.js
import React from 'react';
import { View } from 'react-native';
import {Text, Image} from '../atoms';

const ProfileCard = ({ user }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image.Swipe source={{ uri: user.profilePic }} />
      <Text.Swipe style={{ position: 'absolute', bottom: '45%', left: '5%' }}>
        {user.fullName}
      </Text.Swipe>
      <Text.Swipe style={{ position: 'absolute', bottom: '40%', left: '5%' }}>
        {user.bio || 'Pas de description'}
      </Text.Swipe>
    </View>
  );
};

export default ProfileCard;
