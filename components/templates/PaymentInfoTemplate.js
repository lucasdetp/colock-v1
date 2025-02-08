import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';

const PaymentInfoTemplate = () => {
  const [userData, setUserData] = useState({
    nameCard: '',
    numberCard: '',
    dateCard: '',
    ccvCard: '',
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
            nameCard: data?.nameCard || '',
            numberCard: data?.numberCard || '',
            dateCard: data?.dateCard || '',
            ccvCard: data?.ccvCard || '',
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de paiement:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateUserData = async () => {
    try {
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, 'users', userId);

      await updateDoc(docRef, {
        nameCard: userData.nameCard,
        numberCard: userData.numberCard,
        dateCard: userData.dateCard,
        ccvCard: userData.ccvCard,
      });

      Alert.alert('Succès', 'Les informations de paiement ont été mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de paiement:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des informations de paiement');
    }
  };

  const titleData = [
    {
      svgSource: `
       <svg width="41" height="31" viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.09091 1.25H36.8182C38.6633 1.25 40.1591 2.74578 40.1591 4.59091V26.4091C40.1591 28.2542 38.6633 29.75 36.8182 29.75H4.09091C2.24578 29.75 0.75 28.2542 0.75 26.4091V4.59091C0.75 2.74578 2.24578 1.25 4.09091 1.25Z" stroke="#7790ED" stroke-width="1.5"/>
        <mask id="path-2-inside-1_1093_7111" fill="white">
        <path d="M40.9091 8.68164H0H40.9091Z"/>
        </mask>
        <path d="M40.9091 7.18164H0V10.1816H40.9091V7.18164Z" fill="#7790ED" mask="url(#path-2-inside-1_1093_7111)"/>
        <path d="M19.0927 16.8633H8.18359M16.3654 22.3178H8.18359" stroke="#7790ED" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `,
      title: 'Mes informations de paiement',
    },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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

          <Text.Base style={styles.label}>Nom sur la carte</Text.Base>
          <TextInput
            placeholder="Nom sur la carte"
            style={styles.input}
            value={userData.nameCard}
            onChangeText={(text) => setUserData({ ...userData, nameCard: text })}
          />

          <Text.Base style={styles.label}>Numéro de carte</Text.Base>
          <TextInput
            placeholder="Numéro de carte"
            style={styles.input}
            keyboardType="numeric"
            value={userData.numberCard}
            onChangeText={(text) => setUserData({ ...userData, numberCard: text })}
          />

          <Text.Base style={styles.label}>Date d'expiration</Text.Base>
          <TextInput
            placeholder="MM/AA"
            style={styles.input}
            value={userData.dateCard}
            onChangeText={(text) => setUserData({ ...userData, dateCard: text })}
          />

          <Text.Base style={styles.label}>Code de sécurité (CCV)</Text.Base>
          <TextInput
            placeholder="CCV"
            style={styles.input}
            keyboardType="numeric"
            value={userData.ccvCard}
            onChangeText={(text) => setUserData({ ...userData, ccvCard: text })}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    width: '90%',
    padding: 15,
    elevation: 3,
  },
  goBack: {
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 52, 
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
});

export default PaymentInfoTemplate;
