import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SvgCroix from '../../assets/svg/croix';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { goBack } from 'expo-router/build/global-state/routing';

const PrincipalCaractereTemplate = ({ svgSource, title }) => {
  const [podium, setPodium] = useState([null, null, null]);
  const [traitsCaracterePrincipaux, setTraitsCaracterePrincipaux] = useState([
    "Altruiste", "Bienveillant", "Créatif", "Energique", "Calme", "Consciencieux", "Curieux", "Empathique", "Patient", "Optimiste", "Généreux", "Réservé", "Déterminé", "Sociable"
  ]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.traitsCaracterePrincipaux) {
            setPodium(data.traitsCaracterePrincipaux);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const addToPodium = (trait) => {
    const availableSpotIndex = podium.findIndex(spot => spot === null);
    if (availableSpotIndex !== -1) {
      const newPodium = [...podium];
      newPodium[availableSpotIndex] = trait;
      setPodium(newPodium);

      const newTraits = traitsCaracterePrincipaux.filter(item => item !== trait);
      setTraitsCaracterePrincipaux(newTraits);
    }
  };

  const removeFromPodium = (index) => {
    const newPodium = [...podium];
    const traitToRemove = newPodium[index];

    if (traitToRemove) {
      setTraitsCaracterePrincipaux([...traitsCaracterePrincipaux, traitToRemove]);
      newPodium[index] = null;
      setPodium(newPodium);
    }
  };

  const handleValidation = async () => {
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        const docRef = doc(firestoreDB, 'users', user.uid);
        await setDoc(docRef, {
          traitsCaracterePrincipaux: podium,
        }, { merge: true });

        setMessage('Enregistré avec succès');
        setMessageType('success');
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Un problème est survenu, essayez plus tard');
      setMessageType('error');
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <Container.BasicView style={styles.mainContainer}>
      <Container.BasicScrollView>
      <Container.BasicView style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
          <SvgFlecheRetour />
          <SvgXml xml={svgSource} style={styles.image} />
        </TouchableOpacity>
        <Text.Base style={styles.title}>{title}</Text.Base>
      </Container.BasicView>

      <Container.BasicView style={styles.podiumContainer}>
        <Container.BasicView style={styles.podiumRow}>
          <Container.BasicView style={styles.podiumItemContainer}>
            <Container.BasicView style={styles.podiumTitleContainer}>
              <Text.Base style={styles.podiumTitle2}>{podium[1] || "Trait 2"}</Text.Base>
              {podium[1] && (
                <TouchableOpacity onPress={() => removeFromPodium(1)} style={styles.removeButtonOutside2}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix />
                  </Text.Base>
                </TouchableOpacity>
              )}
            </Container.BasicView>
            <Container.BasicView style={[styles.podiumItem, styles.level2]}>
              <Text.Base style={styles.podiumText}>2</Text.Base>
            </Container.BasicView>
          </Container.BasicView>

          <Container.BasicView style={styles.podiumItemContainer}>
            <Container.BasicView style={styles.podiumTitleContainer}>
              <Text.Base style={styles.podiumTitle}>{podium[0] || "Trait 1"}</Text.Base>
              {podium[0] && (
                <TouchableOpacity onPress={() => removeFromPodium(0)} style={styles.removeButtonOutside}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix />
                  </Text.Base>
                </TouchableOpacity>
              )}
            </Container.BasicView>
            <Container.BasicView style={[styles.podiumItem, styles.level1]}>
              <Text.Base style={styles.podiumText}>1</Text.Base>
            </Container.BasicView>
          </Container.BasicView>

          <Container.BasicView style={styles.podiumItemContainer}>
            <Container.BasicView style={styles.podiumTitleContainer}>
              <Text.Base style={styles.podiumTitle3}>{podium[2] || "Trait 3"}</Text.Base>
              {podium[2] && (
                <TouchableOpacity onPress={() => removeFromPodium(2)} style={styles.removeButtonOutside3}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix />
                  </Text.Base>
                </TouchableOpacity>
              )}
            </Container.BasicView>
            <Container.BasicView style={[styles.podiumItem, styles.level3]}>
              <Text.Base style={styles.podiumText}>3</Text.Base>
            </Container.BasicView>
          </Container.BasicView>
        </Container.BasicView>
      </Container.BasicView>

      <Container.BasicView style={styles.loisirsContainer}>
        {traitsCaracterePrincipaux.map((trait, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => addToPodium(trait)}
            style={styles.loisirItem}
          >
            <Text.Base style={styles.loisirText}>{trait}</Text.Base>
          </TouchableOpacity>
        ))}
      </Container.BasicView>

      <TouchableOpacity onPress={handleValidation} style={styles.button}>
        <Text.Base style={styles.buttonText}>Enregistrer</Text.Base>
      </TouchableOpacity>

      {/* Affichage du message de succès ou d'erreur */}
      {message && (
        <Container.BasicView
          style={[
            styles.messageContainer,
            messageType === 'success' ? styles.successMessage : styles.errorMessage,
          ]}
        >
          <Text.Base style={styles.messageText}>{message}</Text.Base>
        </Container.BasicView>
      )}
      </Container.BasicScrollView>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#6A7CFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: "CustomFontBoldLight",
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    width: '100%',
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  podiumContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 250,
    marginBottom: 20,
  },
  podiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  podiumItemContainer: {
    alignItems: 'center',
  },
  podiumTitleContainer: {
    position: 'relative',
  },
  podiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderColor: '#6A7CFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingRight: 30,
    maxWidth: 150,
    flexShrink: 1,
    textAlign: 'center',
    marginBottom: 15,
  },
  podiumTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    borderColor: '#6A7CFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingRight: 30,
    top: 40,
    maxWidth: 150,
    flexShrink: 1,
    textAlign: 'center',
    marginBottom: 15,
  },
  podiumTitle3: {
    fontSize: 18,
    fontWeight: 'bold',
    borderColor: '#6A7CFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingRight: 30,
    top: 60,
    maxWidth: 150,
    flexShrink: 1,
    textAlign: 'center',
    marginBottom: 15,
  },
  podiumItem: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#7790ED',
  },
  level1: {
    height: 150,
    width: 120,
    backgroundColor: '#7790ED',
    borderColor: '#7790ED',
  },
  level2: {
    height: 110,
    width: 110,
    backgroundColor: '#7790ED',
    borderColor: '#7790ED',
    marginTop: 40,
  },
  level3: {
    height: 90,
    width: 100,
    backgroundColor: '#7790ED',
    borderColor: '#7790ED',
    marginTop: 60,
  },
  podiumText: {
    fontSize: 25,
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 10,
    fontWeight: 'bold',
  },
  removeButtonOutside: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -35 }],
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  removeButtonOutside2: {
    position: 'absolute',
    right: 10,
    top: '100%',
    transform: [{ translateY: -25 }],
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  removeButtonOutside3: {
    position: 'absolute',
    right: 10,
    top: '100%',
    transform: [{ translateY: -5 }],
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  removeText: {
    fontSize: 18,
    color: 'red',
  },
  loisirsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loisirItem: {
    padding: 10,
    margin: 5,
    borderColor: '#6A7CFF',
    borderWidth: 1,
    borderRadius: 20,
  },
  loisirText: {
    color: '#6D6D6D',
    fontSize: 16,
  },
  messageContainer: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
  },
  errorMessage: {
    backgroundColor: '#F44336',
  },
  messageText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PrincipalCaractereTemplate;
