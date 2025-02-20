import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BaseTextInput from '../atoms/TextInput/Base';
import {PicturePicker} from '../organims';
import { Container, Text } from '../atoms';
import SvgFlecheBleu from '@/assets/svg/flecheBleu';

const AddPictureTemplate = ({ profilePic, profilePic2, profilePic3, handleAvatar, bio, setBio, saveProfile }) => {
  return (
    <Container.BasicView style={styles.container}>
      <PicturePicker profilePic={profilePic} handleAvatar={() => handleAvatar(1)} />
      <PicturePicker profilePic={profilePic2} handleAvatar={() => handleAvatar(2)} />
      <PicturePicker profilePic={profilePic3} handleAvatar={() => handleAvatar(3)} />
      <BaseTextInput
        placeholder="Décrivez-vous..."
        secureTextEntry={false}
        onChangeText={setBio}
      />
      <TouchableOpacity onPress={saveProfile} style={styles.button}>
          <Text.Base style={styles.buttonText}>Valider 5/5</Text.Base>
          <SvgFlecheBleu />
        </TouchableOpacity>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '50%',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#C9DDFC',
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
  },
  buttonText: {
    color: '#3A3A3A',
    fontSize: 20,
    fontFamily: 'CustomFontBold',
  },
});

export default AddPictureTemplate;
