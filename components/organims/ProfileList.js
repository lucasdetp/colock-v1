// components/organisms/ProfileList.js
import React from 'react';
import { View } from 'react-native';
import {ProfileCard} from '../molecules';

const ProfileList = ({ cards }) => {
  return (
    <View>
      {cards.map(user => (
        <ProfileCard key={user.id} user={user} />
      ))}
    </View>
  );
};

export default ProfileList;
