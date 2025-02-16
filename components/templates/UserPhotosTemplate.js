import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, Modal, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import SvgEdit from '../../assets/svg/edit';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useLoader } from '@/context/LoaderContext';

const UserPhotosTemplate = () => {
  const [userData, setUserData] = useState({
    profilePic: '',
    profilePic2: '',
    profilePic3: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const navigation = useNavigation();
   const { setLoading } = useLoader();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // loader
      setTimeout(() => setLoading(false), 3000); // loader 3s 
      try {
        const userId = firebaseAuth.currentUser.uid;
        const docRef = doc(firestoreDB, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            profilePic: data.profilePic || '',
            profilePic2: data.profilePic2 || '',
            profilePic3: data.profilePic3 || '',
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = (imageUri) => {
    if (imageUri) {
      setSelectedImage(imageUri);
      setModalVisible(true);
    }
  };

  const handleEditClick = (imageType) => {
    openImagePicker(imageType);
  };

  const openImagePicker = async (imageType) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission refusée", "L'accès à la galerie est nécessaire pour sélectionner une image");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      uploadImageToStorage(uri, imageType);
    }
  };

  const uploadImageToStorage = async (uri, imageType) => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const uniqueId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const imageName = `avatars/${uid}/${uniqueId}.jpg`;
    const storageRef = ref(getStorage(), imageName);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);
  
      updateUserImage(imageUrl, imageType);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du téléchargement de l'image");
    }
  };
  
  const updateUserImage = async (imageUrl, imageType) => {
    const updatedUserData = { ...userData };

    if (imageType === "profilePic1") {
      updatedUserData.profilePic = imageUrl;
    } else if (imageType === "profilePic2") {
      updatedUserData.profilePic2 = imageUrl;
    } else if (imageType === "profilePic3") {
      updatedUserData.profilePic3 = imageUrl;
    } else {
      console.error("Aucun champ valide trouvé pour la mise à jour");
      return;
    }
  
    setUserData(updatedUserData);
  
    try {
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, "users", userId);
  
      await updateDoc(docRef, updatedUserData);
      Alert.alert("Succès", "Photo mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'image:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour");
    }
  };

  const titleData = [
    {
      svgSource: `
        <svg width="45" height="41" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.1429 0.5H2.14286C1.57454 0.5 1.02949 0.725765 0.627628 1.12763C0.225765 1.52949 0 2.07454 0 2.64286V28.3571C0 28.9255 0.225765 29.4705 0.627628 29.8724C1.02949 30.2742 1.57454 30.5 2.14286 30.5H32.1429C32.7112 30.5 33.2562 30.2742 33.6581 29.8724C34.06 29.4705 34.2857 28.9255 34.2857 28.3571V2.64286C34.2857 2.07454 34.06 1.52949 33.6581 1.12763C33.2562 0.725765 32.7112 0.5 32.1429 0.5ZM2.14286 28.3571V2.64286H32.1429V28.3571H2.14286Z" fill="#7790ED"/>
        <path d="M7.35882 11.9286C7.99454 11.9286 8.61599 11.7401 9.14458 11.3869C9.67316 11.0337 10.0851 10.5317 10.3284 9.94434C10.5717 9.35701 10.6354 8.71072 10.5113 8.08721C10.3873 7.4637 10.0812 6.89097 9.63166 6.44144C9.18213 5.99192 8.6094 5.68579 7.98589 5.56176C7.36238 5.43774 6.7161 5.50139 6.12876 5.74467C5.54143 5.98796 5.03943 6.39994 4.68624 6.92853C4.33305 7.45711 4.14453 8.07856 4.14453 8.71429C4.14453 9.56677 4.48318 10.3843 5.08597 10.9871C5.68877 11.5899 6.50634 11.9286 7.35882 11.9286ZM7.35882 7C7.69832 6.99788 8.03081 7.09661 8.31412 7.28369C8.59744 7.47076 8.81883 7.73775 8.95023 8.0508C9.08162 8.36385 9.1171 8.70887 9.05217 9.04211C8.98724 9.37535 8.82482 9.68181 8.58551 9.92263C8.34619 10.1635 8.04076 10.3278 7.70793 10.3948C7.3751 10.4618 7.02987 10.4285 6.716 10.2991C6.40213 10.1697 6.13376 9.94994 5.94492 9.6678C5.75607 9.38566 5.65525 9.0538 5.65525 8.71429C5.65806 8.26334 5.83844 7.83166 6.15732 7.51279C6.47619 7.19391 6.90787 7.01353 7.35882 7.01072V7Z" fill="#7790ED"/>
        <path d="M22.2791 13.8116L16.4934 19.5973L12.2077 15.3116C12.007 15.112 11.7354 15 11.4523 15C11.1693 15 10.8977 15.112 10.697 15.3116L4.21484 21.8794V24.9116L11.4898 17.6366L15.0148 21.108L10.997 25.1258H13.9434L22.997 16.0723L30.0148 23.058V20.0366L23.7898 13.8116C23.5891 13.612 23.3175 13.5 23.0345 13.5C22.7514 13.5 22.4799 13.612 22.2791 13.8116Z" fill="#7790ED"/>
        </svg>
      `,
      title: 'Mes photos',
    },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {titleData.map((item, index) => (
        <Container.BasicView key={index} style={styles.headerContainer}>
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <SvgFlecheRetour />
            <SvgXml xml={item.svgSource} style={styles.image} />
          </TouchableOpacity>
          <Text.Base style={styles.title}>{item.title}</Text.Base>
        </Container.BasicView>
      ))}

      <ScrollView contentContainerStyle={styles.photosContainer}>
        <Container.BasicView style={styles.photoContainer}>
          {[userData.profilePic, userData.profilePic2, userData.profilePic3].map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
              {image ? (
                <Image source={{ uri: image }} style={styles.photo} />
              ) : (
                <Container.BasicView style={styles.emptyPhotoContainer}>
                  <Text.Base style={styles.emptyPhotoText}>Ajouter une photo</Text.Base>
                </Container.BasicView>
              )}
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => handleEditClick(`profilePic${index + 1}`)}
              >
                <SvgEdit style={styles.editIconSvg} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </Container.BasicView>
      </ScrollView>

      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
    padding: 15,
    elevation: 3,
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 52,
    marginRight: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    fontFamily: "CustomFontBoldLight",
  },
  photosContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  emptyPhotoContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  emptyPhotoText: {
    color: '#777',
    fontSize: 14,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    borderRadius: 20,
  },
  editIconSvg: {
    width: 20,
    height: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default UserPhotosTemplate;
