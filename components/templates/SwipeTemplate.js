// components/templates/SwipeTemplate.js
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import {ProfileList} from '../organims';
import {Button} from '../atoms';

const SwipeTemplate = ({ cards, onSwipeLeft, onSwipeRight }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ProfileList cards={cards} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <Button.Swipe onPress={onSwipeLeft} title="Nope" />
          <Button.Swipe onPress={onSwipeRight} title="Yep" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SwipeTemplate;
