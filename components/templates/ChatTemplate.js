import React from 'react';
import { TextInput, KeyboardAvoidingView, Image, Platform, View } from 'react-native';
import { Text, Container, Button } from '../atoms';
import { FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const ChatTemplate = ({ 
  messages, 
  otherUserProfilePic, 
  sendMessage, 
  message, 
  setMessage, 
  isLoading, 
  user, 
  otherUserName, 
  onBackPress 
}) => {

  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
  };

  return (
    <Container.BasicView style={{ flex: 1 }}>
      <Container.BasicView style={{ 
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 20, 
        justifyContent: 'space-between',
        paddingHorizontal: 16, 
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
      }}>
        <Button.BasicButton onPress={onBackPress} style={{ marginRight: 10 }}>
          <MaterialIcons name="chevron-left" size={28} color="black" />
        </Button.BasicButton>

        <Text.Base style={{ 
          color: 'black', 
          fontSize: 18, 
          fontWeight: 'bold',
        }}>
          {otherUserName}
        </Text.Base>
        {/* Photo de profil */}
        {otherUserProfilePic !== 'N/A' ? (
          <Image
            source={{ uri: otherUserProfilePic }}
            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
          />
        ) : (
          <FontAwesome5 
            name="user-circle" 
            size={40} 
            color="#ccc" 
            style={{ marginRight: 10 }} 
          />
        )}
      </Container.BasicView>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Container.BasicScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
          {isLoading ? (
            <Text.Base>Loading messages...</Text.Base>
          ) : (
            messages.map((msg, index) => {
              const isSentByCurrentUser = msg.user?.user?.email === user.user.email;

              return (
                <Container.BasicView 
                  key={index} 
                  style={{ 
                    flexDirection: isSentByCurrentUser ? 'row-reverse' : 'row', 
                    alignItems: 'flex-end',
                    marginVertical: 15,
                    paddingHorizontal: 15,
                  }}
                >

                  {/* Bulle de message avec pic */}
                  <View style={{ 
                    maxWidth: '75%', 
                    position: 'relative',
                  }}>
                    <View 
                      style={{
                        padding: 10,
                        backgroundColor: isSentByCurrentUser ? '#6d24a5' : '#e5e5e5',
                        borderRadius: 15,
                        position: 'relative',
                      }}
                    >
                      <Text.Base style={{ color: isSentByCurrentUser ? '#fff' : '#000' }}>
                        {msg.message}
                      </Text.Base>

                      {/* Pic de la bulle */}
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 8,
                          [isSentByCurrentUser ? 'right' : 'left']: -8,
                          width: 0,
                          height: 0,
                          borderTopWidth: 10,
                          borderTopColor: 'transparent',
                          borderBottomWidth: 10,
                          borderBottomColor: 'transparent',
                          borderLeftWidth: isSentByCurrentUser ? 10 : 0,
                          borderLeftColor: isSentByCurrentUser ? '#6d24a5' : 'transparent',
                          borderRightWidth: isSentByCurrentUser ? 0 : 10,
                          borderRightColor: isSentByCurrentUser ? 'transparent' : '#e5e5e5',
                        }}
                      />
                    </View>

                    {/* Heure du message */}
                    <Text.Base 
                      style={{ 
                        fontSize: 12, 
                        color: '#666', 
                        marginTop: 2,
                        marginLeft: isSentByCurrentUser ? 0 : 10,
                        marginRight: isSentByCurrentUser ? 10 : 0, 
                        alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {formatTime(msg.timeStamp)}
                    </Text.Base>
                  </View>
                </Container.BasicView>
              );
            })
          )}
        </Container.BasicScrollView>

        {/* Input pour taper le message */}
        <Container.BasicView style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingBottom: Platform.OS === 'ios' ? 30 : 10 }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}
            placeholder="Message..."
            value={message}
            multiline={true}
            onChangeText={setMessage}
          />
          <Button.BasicButton onPress={sendMessage} style={{ marginLeft: 10 }}>
            <FontAwesome name="send" size={24} color="#6d24a5" />
          </Button.BasicButton>
        </Container.BasicView>
      </KeyboardAvoidingView>
    </Container.BasicView>
  );
};

export default ChatTemplate;
