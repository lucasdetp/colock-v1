import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Container, Text, TextInput } from '../atoms';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const WhereEditTemplate = ({ headerData }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigation = useNavigation();

  // Charger la ville de l'utilisateur depuis Firebase
  useEffect(() => {
    const fetchUserCity = async () => {
      const userId = firebaseAuth.currentUser.uid;
      const userRef = doc(firestoreDB, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.citySearch) {
          setCity(data.citySearch); // initialisation de `city`
          setSelectedCity(data.citySearch); // initialisation de `selectedCity`
        }
      }
    };
    
    fetchUserCity();

    // Récupérer la localisation actuelle
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  // Lorsque l'on clique sur la carte
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      let [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (address?.city) {
        setSelectedCity(address.city); // Mise à jour sans sauvegarde immédiate
        setCity(address.city); // Mettre à jour également le champ de texte
      } else {
        setSelectedCity('');
        setCity('Ville non trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la ville:', error);
    }
  };

  // Sauvegarder la ville sélectionnée
  const handleSaveCity = async () => {
    if (!selectedCity) return; // Ne sauvegarde que si une ville a été sélectionnée

    const userId = firebaseAuth.currentUser.uid;
    try {
      await setDoc(doc(firestoreDB, 'users', userId), { citySearch: selectedCity }, { merge: true });
      console.log('✅ Ville enregistrée:', selectedCity);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour de la ville:', error);
    }
  };

  // Mettre à jour `selectedCity` en même temps que `city` quand l'utilisateur écrit
  const handleCityChange = (text) => {
    setCity(text);
    setSelectedCity(text); // Mettre à jour aussi `selectedCity`
  };

  return (
    <Container.BasicView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
          <SvgFlecheRetour />
        </TouchableOpacity>
        {headerData.svgSource && <SvgXml xml={headerData.svgSource} />}
        <Text.Base style={styles.title}>{headerData.title}</Text.Base>
      </View>

      <Text.Base style={styles.checkboxText}>Ville, code postal</Text.Base>

      {/* Input de la ville */}
      <TextInput.City
        style={styles.input}
        placeholder="Saisissez un nom de ville, un code postal..."
        value={city}
        onChangeText={handleCityChange} // Met à jour `selectedCity` et `city`
      />

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Votre position"
          />
        </MapView>
      )}

      {/* Bouton pour sauvegarder la ville */}
      <TouchableOpacity onPress={handleSaveCity} style={styles.button}>
        <Text.Base style={styles.buttonText}>Sélectionner cette ville</Text.Base>
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
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  goBack: {
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: 450,
    borderRadius: 15,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7790ED',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'normal',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default WhereEditTemplate;
