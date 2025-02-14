import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';
import { LoginForm } from '../organims';
import { Container, Text } from '../atoms';
import SvgLogoHome from '@/assets/svg/logoHome';

const LoginTemplate = ({ logo, email, setEmail, password, setPassword, handleLogin, alert, alertMessage, navigateToRegister }) => {
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    async function loadVideo() {
      const videoAsset = require('../../assets/video/background1.mp4');
      const asset = await Asset.fromModule(videoAsset).downloadAsync();
      setVideoUri(asset.localUri);
    }

    loadVideo();
  }, []);

  return (
    <Container.BasicView style={styles.container}>
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={styles.backgroundVideo}
          shouldPlay
          isLooping
          resizeMode="cover"
          isMuted
        />
      )}

      <Container.BasicView style={styles.content}>
        <Container.BasicView style={styles.logo}>
          <SvgLogoHome />
        </Container.BasicView>

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          alert={alert}
          alertMessage={alertMessage}
        />

        <TouchableOpacity onPress={navigateToRegister}>
          <Text.Base style={styles.linkText}>Inscription</Text.Base>
        </TouchableOpacity>
      </Container.BasicView>
    </Container.BasicView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '115%',
    height: '115%',
  },
  content: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  linkText: {
    marginTop: 10,
    color: '#6D6D6D',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default LoginTemplate;
