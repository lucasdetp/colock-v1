// components/templates/WhereTemplate.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Container, Text, TextInput } from '../atoms';

const WhereTemplate = ({ navigateToNextStep, saveCityData }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    try {
      let [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (address && address.city) {
        setCity(address.city);
        saveCityData(address.city);
      } else {
        setCity('Ville non trouvée');
        saveCityData('Ville non trouvée');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la ville:', error);
    }
  };

  return (
    <Container.BasicView style={styles.container}>
      <Text.Base style={styles.title}>Où ?</Text.Base>
      <Container.BasicView style={styles.leftAlign}>
        <Text.Base style={styles.checkboxText}>Ville, code postal</Text.Base>
      </Container.BasicView>
      <TextInput.City
        style={styles.input}
        placeholder="Saisissez un nom de ville, un code postal..."
        value={city}
        onChangeText={(text) => {
          setCity(text); 
          saveCityData(text);
        }}
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
      <TouchableOpacity onPress={navigateToNextStep} style={styles.button}>
        <Text.Base style={styles.buttonText}>Valider 3/5</Text.Base>
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
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#3A3A3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  leftAlign: {
    width: '100%',
    marginLeft: 10,
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  checkboxText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#6A7CFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WhereTemplate;
