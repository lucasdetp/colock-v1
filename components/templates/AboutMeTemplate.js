import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { flecheBas, flecheHaut } from '../../assets';
import { SvgXml } from 'react-native-svg';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { SwipeCard } from '../organims';

const AboutMe = ({ svgSource, title }) => {
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
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
            nameCard: data.nameCard || '',
            numberCard: data.numberCard || '',
            dateCard: data.dateCard || '',
            ccvCard: data.ccvCard || '',
            profilePic: data.profilePic || '',
            profilePic2: data.profilePic2 || '',
            profilePic3: data.profilePic3 || '',
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const calculateFillPercentage = () => {
    const totalFields = 8;
    let filledFields = 0;

    if (userData.firstName) filledFields++;
    if (userData.lastName) filledFields++;
    if (userData.age) filledFields++;
    if (userData.facturationAddress) filledFields++;
    if (userData.nameCard) filledFields++;
    if (userData.numberCard) filledFields++;
    if (userData.dateCard) filledFields++;
    if (userData.ccvCard) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const formatDate = (text) => {
    let formattedText = text.replace(/[^\d]/g, '');
    if (formattedText.length >= 2) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
    }
    return formattedText;
  };

  
  const handleUpdateUserData = async () => {
    try {
      const userId = firebaseAuth.currentUser.uid;
      const docRef = doc(firestoreDB, 'users', userId);
  
      await updateDoc(docRef, {
        fullName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.age,
        facturationAddress: userData.facturationAddress,
        nameCard: userData.nameCard,
        numberCard: userData.numberCard,
        dateCard: userData.dateCard,
        ccvCard: userData.ccvCard,
      });
  
      Alert.alert('Succès', 'Les informations ont été mises à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de l\'utilisateur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des informations');
    }
  };
  
  const currentPercentage = calculateFillPercentage();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container.BasicView style={styles.mainContainer}>
        <Container.BasicView style={styles.headerContainer}>
          <SvgXml xml={svgSource} style={styles.image} />
          <Text.Base style={styles.title}>{title}</Text.Base>
          <Container.BasicView style={styles.percentageCircle}>
            <Text.Base style={styles.percentage}>{currentPercentage}%</Text.Base>
          </Container.BasicView>
        </Container.BasicView>

        <Container.BasicView style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, showPersonalForm && styles.buttonActive]}
            onPress={() => setShowPersonalForm(!showPersonalForm)}
          >
            <Text.Base style={styles.buttonText}>
              Nom, prénom, date de naissance...
            </Text.Base>
            <Image
              source={showPersonalForm ? flecheHaut : flecheBas}
              style={styles.arrow}
            />
          </TouchableOpacity>

          {/* Formulaire déroulant : Informations personnelles */}
          {showPersonalForm && (
            <Container.BasicView style={styles.form}>
              <Text.Base style={styles.titleInput}>Prénom</Text.Base>
              <TextInput
                placeholder="Prénom"
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
              />
              <Text.Base style={styles.titleInput}>Nom</Text.Base>
              <TextInput
                placeholder="Nom"
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) => setUserData({ ...userData, lastName: text })}
              />
              <Text.Base style={styles.titleInput}>Âge</Text.Base>
              <TextInput
                placeholder="Âge"
                style={styles.input}
                keyboardType="numeric"
                value={userData.age}
                onChangeText={(text) => setUserData({ ...userData, age: text })}
              />
              <Text.Base style={styles.titleInput}>Adresse de facturation</Text.Base>
              <TextInput
                placeholder="Adresse de facturation"
                style={styles.input}
                value={userData.facturationAddress}
                onChangeText={(text) => setUserData({ ...userData, facturationAddress: text })}
              />
              <Button title="Enregistrer" onPress={handleUpdateUserData} />
            </Container.BasicView>
          )}

          {/* Espacement entre les boutons */}
          <Container.BasicView style={styles.spacer} />

          {/* Bouton pour les informations de paiement */}
          <TouchableOpacity
            style={[styles.button, showPaymentForm && styles.buttonActive]}
            onPress={() => setShowPaymentForm(!showPaymentForm)}
          >
            <Text.Base style={styles.buttonText}>Tes moyens de payement...</Text.Base>
            <Image
              source={showPaymentForm ? flecheHaut : flecheBas}
              style={styles.arrow}
            />
          </TouchableOpacity>

          {/* Formulaire déroulant : Informations de paiement */}
          {showPaymentForm && (
            <Container.BasicView style={styles.form}>
              <Text.Base style={styles.titleInput}>Nom figurant sur la carte</Text.Base>
              <TextInput
                placeholder="Nom sur la carte"
                style={styles.input}
                value={userData.nameCard}
                onChangeText={(text) => setUserData({ ...userData, nameCard: text })}
              />
              <Text.Base style={styles.titleInput}>Numéro de carte</Text.Base>
              <TextInput
                placeholder="Numéro de carte"
                style={styles.input}
                keyboardType="numeric"
                value={userData.numberCard}
                onChangeText={(text) => setUserData({ ...userData, numberCard: text })}
              />
              <Text.Base style={styles.titleInput}>Date de fin de validité</Text.Base>
              <TextInput
                placeholder="MM/AA"
                style={styles.input}
                keyboardType="numeric"
                value={userData.dateCard}
                onChangeText={(text) => {
                  const formattedText = formatDate(text);
                  setUserData({ ...userData, dateCard: formattedText });
                }}
              />
              <Text.Base style={styles.titleInput}>CCV</Text.Base>
              <TextInput
                placeholder="CCV"
                style={styles.input}
                keyboardType="numeric"
                value={userData.ccvCard}
                onChangeText={(text) => {
                  const formattedText = text.replace(/[^\d]/g, '').slice(0, 3);
                  setUserData({ ...userData, ccvCard: formattedText });
                }}
              />
              <Button title="Enregistrer" onPress={handleUpdateUserData} />
            </Container.BasicView>
          )}
        </Container.BasicView>
      </Container.BasicView>
        <Text.Base style={styles.titleH2}>Tes photos</Text.Base>
        <SwipeCard.ImageSwipe profilePic={userData?.profilePic} />
        <SwipeCard.ImageSwipe profilePic={userData?.profilePic2} />
        <SwipeCard.ImageSwipe profilePic={userData?.profilePic3} />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  percentageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#7790ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b6b6b',
  },
  buttonsContainer: {
    width: '90%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'left',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonActive: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: '#6D6D6D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  arrow: {
    width: 30,
    height: 17,
    tintColor: '#6D6D6D',
  },
  form: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    position: 'relative',
    top: -15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.25)', 
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  spacer: {
    marginVertical: 20,
  },
  titleH2: {
    fontSize: 20,
    marginLeft: 60,
    marginTop: 20,
    fontWeight: '500',
    textAlign: 'left',
    color: '#000',
  },
  
});

export default AboutMe;
