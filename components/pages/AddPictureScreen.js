// components/pages/AddPictureScreen.js
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import {AddPictureTemplate} from "../templates";
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";
import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native"; 
import { useDispatch } from "react-redux";
import { SET_USER } from "../../context/actions/userActions";
import {Text} from "../atoms"

const AddPictureScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePic2, setProfilePic2] = useState(null);
  const [profilePic3, setProfilePic3] = useState(null);
  const [bio, setBio] = useState("");
  const route = useRoute();
  const { userId } = route.params || {};
  const dispatch = useDispatch();

  if (!userId) {
    return <Text.Base> </Text.Base>; // TOOD
  }

  const handleAvatar = async (imageIndex) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.5,
      });

      if (!result.cancelled && result.assets[0].uri) {
        const user = firebaseAuth.currentUser;
        const uid = user.uid;
        const uniqueId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const imageName = `avatars/${uid}/${uniqueId}.jpg`;
        const storageRef = ref(getStorage(), imageName);

        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        const snapshot = await uploadBytes(storageRef, blob);

        const imageUrl = await getDownloadURL(snapshot.ref);

        if (imageIndex === 1) setProfilePic(imageUrl);
        if (imageIndex === 2) setProfilePic2(imageUrl);
        if (imageIndex === 3) setProfilePic3(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const saveProfile = async () => {
    try {
      const userDocRef = doc(firestoreDB, "users", userId);
      await updateDoc(userDocRef, { profilePic, profilePic2, profilePic3, bio });
  
      const updatedUser = {
        _id: userId,
        profilePic,
        profilePic2,
        profilePic3,
        bio,
      };
      dispatch(SET_USER(updatedUser));
  
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 34 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <AddPictureTemplate
        profilePic={profilePic}
        profilePic2={profilePic2}
        profilePic3={profilePic3}
        handleAvatar={(index) => handleAvatar(index)}
        bio={bio}
        setBio={setBio}
        saveProfile={saveProfile}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPictureScreen;
