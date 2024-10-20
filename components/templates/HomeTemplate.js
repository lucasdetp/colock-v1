// components/templates/HomeTemplate.js
import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {Text, Image} from '../atoms';
import {MessageList} from '../organims';
import { Logo } from '../../assets';

const HomeTemplate = ({ chats, isLoading, onPressMessage }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <Image.Base source={Logo} style={{ width: 50, height: 50 }} />
      </View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text.Base style={{ fontWeight: 'bold', fontSize: 20 }}>Messages</Text.Base>
          <MessageList chats={chats} isLoading={isLoading} onPressMessage={onPressMessage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTemplate;
