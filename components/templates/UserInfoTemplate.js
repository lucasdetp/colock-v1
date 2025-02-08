import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';

const UserInfoTemplate = () => {
  const [userData, setUserData] = useState({
     firstName: '',
     lastName: '',
     age: '',
     facturationAddress: '',
     nameCard: '',
     numberCard: '',
     dateCard: '',
     ccvCard: '',
     profilePic: '',
     profilePic2: '',
     profilePic3: '',
   });
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = firebaseAuth.currentUser.uid;
        const docRef = doc(firestoreDB, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            firstName: data.fullName || '',
            lastName: data.lastName || '',
            age: data.birthdate || '',
            facturationAddress: data.facturationAddress || '',
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateUserData = async () => {
    try {
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, 'users', userId);

      await updateDoc(docRef, {
        fullName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.age,
        facturationAddress: userData.facturationAddress,
      });

      Alert.alert('Succès', 'Les informations ont été mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour');
    }
  };

  const titleData = [
    {
      svgSource: `
       <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.6329 24.5443H17.7215C18.2236 24.5443 18.6448 24.3742 18.9851 24.0339C19.3253 23.6937 19.4949 23.2731 19.4937 22.7722V17.4557C19.4937 16.9536 19.3235 16.533 18.9833 16.1939C18.643 15.8549 18.2224 15.6847 17.7215 15.6835V13.9114C17.7215 12.9367 17.3748 12.1026 16.6813 11.4091C15.9878 10.7156 15.1531 10.3683 14.1772 10.3671C13.2014 10.3659 12.3673 10.7132 11.6749 11.4091C10.9826 12.105 10.6353 12.9391 10.6329 13.9114V15.6835C10.1308 15.6835 9.71021 15.8537 9.37114 16.1939C9.03207 16.5342 8.86194 16.9548 8.86076 17.4557V22.7722C8.86076 23.2743 9.03089 23.6954 9.37114 24.0357C9.71139 24.3759 10.132 24.5455 10.6329 24.5443ZM12.4051 15.6835V13.9114C12.4051 13.4093 12.5752 12.9887 12.9154 12.6496C13.2557 12.3105 13.6763 12.1404 14.1772 12.1392C14.6781 12.1381 15.0993 12.3082 15.4408 12.6496C15.7822 12.9911 15.9517 13.4116 15.9494 13.9114V15.6835H12.4051ZM14.1772 35C13.9705 35 13.7785 34.9852 13.6013 34.9557C13.4241 34.9262 13.2468 34.8819 13.0696 34.8228C9.08228 33.4937 5.90717 31.0345 3.5443 27.4453C1.18143 23.8561 0 19.9946 0 15.8608V7.48734C0 6.74895 0.21443 6.08439 0.643291 5.49367C1.07215 4.90295 1.62565 4.47468 2.3038 4.20886L12.9367 0.221519C13.3502 0.0738397 13.7637 0 14.1772 0C14.5907 0 15.0042 0.0738397 15.4177 0.221519L26.0506 4.20886C26.73 4.47468 27.2841 4.90295 27.7129 5.49367C28.1418 6.08439 28.3556 6.74895 28.3544 7.48734V15.8608C28.3544 19.9958 27.173 23.8579 24.8101 27.4471C22.4473 31.0363 19.2722 33.4949 15.2848 34.8228C15.1076 34.8819 14.9304 34.9262 14.7532 34.9557C14.576 34.9852 14.384 35 14.1772 35ZM14.1772 32.375C17.2489 31.4003 20.9193 29.1741 22.9277 26.25C24.9362 23.3259 25.5527 19.4346 25.5527 15.8608V7L14.1772 2.625L2.80273 7V15.8608C2.80273 19.4346 4.2943 23.3259 6.30273 26.25C8.31117 29.1741 11.1055 31.4003 14.1772 32.375Z" fill="#7790ED"/>
  </svg>
      `,
      title: 'Mes informations personnelles',
    },
  ];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        {titleData.map((item, index) => (
          <Container.BasicView key={index} style={styles.headerContainer}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
              <SvgFlecheRetour />
            </TouchableOpacity>
            <SvgXml xml={item.svgSource} style={styles.image} />
            <Text.Base style={styles.title}>{item.title}</Text.Base>
            </Container.BasicView>
          
        ))}
    <Container.BasicView style={styles.containerForm}>
      <Container.BasicView style={styles.formContainer}>

        <Text.Base style={styles.label}>Prénom</Text.Base>
        <TextInput
            placeholder="Prénom"
            style={styles.input}
            value={userData.firstName}
            onChangeText={(text) => setUserData({ ...userData, firstName: text })}
        />

        <Text.Base style={styles.label}>Nom</Text.Base>
        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={userData.lastName}
          onChangeText={(text) => setUserData({ ...userData, lastName: text })}
        />

        <Text.Base style={styles.label}>Âge</Text.Base>
        <TextInput
          placeholder="Âge"
          style={styles.input}
          keyboardType="numeric"
          value={userData.age}
          onChangeText={(text) => setUserData({ ...userData, age: text })}
        />

        <Text.Base style={styles.label}>Adresse de facturation</Text.Base>
        <TextInput
          placeholder="Adresse de facturation"
          style={styles.input}
          value={userData.facturationAddress}
          onChangeText={(text) => setUserData({ ...userData, facturationAddress: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateUserData}>
          <Text.Base style={styles.buttonText}>Enregistrer</Text.Base>
        </TouchableOpacity>
      </Container.BasicView>
      </Container.BasicView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
  },
  goBack: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
    padding: 15,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfoTemplate;
