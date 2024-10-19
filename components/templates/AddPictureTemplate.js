import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import BaseTextInput from '../atoms/TextInput/Base';
import {PicturePicker} from '../organims';

const AddPictureTemplate = ({ profilePic, handleAvatar, bio, setBio, saveProfile }) => {
  return (
    <View style={styles.container}>
      <PicturePicker profilePic={profilePic} handleAvatar={handleAvatar} />
      <BaseTextInput
        placeholder="Décrivez-vous..."
        secureTextEntry={false}
        onChangeText={setBio}
      />
      <Button title="Enregistrer" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AddPictureTemplate;
