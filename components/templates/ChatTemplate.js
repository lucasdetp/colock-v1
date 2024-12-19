import React from 'react';
import { TextInput, KeyboardAvoidingView, Image, Platform } from 'react-native';
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
      {/* Barre de navigation avec flèche de retour et nom d'utilisateur */}
      <Container.BasicView style={{ 
        backgroundColor: '#6d24a5', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10, 
        paddingHorizontal: 16, 
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        justifyContent: 'center',
      }}>
        <Button.BasicButton onPress={onBackPress} style={{ position: 'absolute', left: 16, top: 45, zIndex: 1, }}>
          <MaterialIcons name="chevron-left" size={28} color="#fff" />
        </Button.BasicButton>

        <Text.Base style={{ 
          color: '#fff', 
          fontSize: 18, 
          textAlign: 'center', 
          flex: 1 
        }}>
          {otherUserName}
        </Text.Base>
      </Container.BasicView>


      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
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
                    flexDirection: 'row', 
                    justifyContent: isSentByCurrentUser ? 'flex-end' : 'flex-start', 
                    marginVertical: 5,
                    alignItems: 'center',
                  }}
                >
                  {/* Affichage de la photo de profil uniquement pour l'autre utilisateur */}
                  {!isSentByCurrentUser && (
                    otherUserProfilePic !== 'N/A' ? (
                      <Image
                        source={{ uri: otherUserProfilePic }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                      />
                    ) : (
                      <FontAwesome5 
                        name="user-circle" 
                        size={40} 
                        color="#ccc" 
                        style={{ marginRight: 10 }} 
                      />
                    )
                  )}

                  <Container.BasicView>
                    {/* bulle de message */}
                    <Container.BasicView style={{
                      padding: 10,
                      backgroundColor: isSentByCurrentUser ? '#6d24a5' : '#e5e5e5',
                      borderRadius: 20,
                    }}>
                      <Text.Base style={{ color: isSentByCurrentUser ? '#fff' : '#000' }}>
                        {msg.message}
                      </Text.Base>
                    </Container.BasicView>
                    <Text.Base 
                      style={{ 
                        fontSize: 12, 
                        color: '#666', 
                        marginTop: 1, 
                        alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start' 
                      }}
                    >
                      {formatTime(msg.timeStamp)}
                    </Text.Base>
                  </Container.BasicView>
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
