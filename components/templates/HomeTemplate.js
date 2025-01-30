// components/templates/HomeTemplate.js
import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import {Text, Image} from '../atoms';
import {MessageList} from '../organims';
import { Logo } from '../../assets';

const HomeTemplate = ({ chats, isLoading, onPressMessage, auth }) => { 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <ScrollView>
        <View style={{ padding: 10 }}>
          <MessageList 
            chats={chats} 
            isLoading={isLoading} 
            onPressMessage={onPressMessage} 
            auth={auth} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTemplate;
