import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const PicturePicker = ({ profilePic, handleAvatar }) => {
  return (
    <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatar}>
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.addText}>Choisir une photo</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addText: {
    fontSize: 24,
    color: '#555',
  },
});

export default PicturePicker;
