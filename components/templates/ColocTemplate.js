import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text } from '../atoms';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import SvgCroix from '../../assets/svg/croix';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from 'expo-router';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import SvgInfo from '../../assets/svg/info';

const ColocTemplate = ({ svgSource, title }) => {
  const [podium, setPodium] = useState([null, null, null]);
  const [traitsCaracterePrincipaux, setTraitsCaracterePrincipaux] = useState([
    "Altruiste", "Bienveillant", "Créatif", "Energique", "Calme", "Consciencieux", "Curieux", "Empathique", "Patient", "Optimiste", "Généreux", "Réservé", "Déterminé", "Sociable"
  ]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [lookingFor, setLookingFor] = useState(null);
  const [lookingAge, setLookingAge] = useState(['Peu importe']);
  const [lookingForRegime, setLookingForRegime] = useState(['Tout']);
  const [regimeDescriptions, setRegimeDescriptions] = useState({});
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
          if (data.lookingFor) {
            setLookingFor(data.lookingFor);
          }
          if (data.lookingAge) {
            setLookingAge(data.lookingAge);
          }
          if (data.lookingForRegime) {
            setLookingForRegime(data.lookingForRegime);
          }
        }
      }
      const descriptions = {
        'Tout': 'Tous les régimes alimentaires.',
        'Végétarien': 'Un régime végétarien exclut la viande, mais inclut d’autres produits d’origine animale.',
        'Flexitarien': 'Un flexitarien suit principalement un régime végétarien, mais mange occasionnellement de la viande.',
        'Végan': 'Un régime végétalien exclut tous les produits d’origine animale, y compris les œufs et les produits laitiers.',
        'Diète cétogène': 'Un régime faible en glucides et riche en graisses qui force le corps à entrer en cétose.',
        'Hypocalorique': 'Un régime hypocalorique est conçu pour consommer moins de calories que celles que le corps brûle.',
        'Paléolithique': 'Un régime qui se base sur les aliments consommés par nos ancêtres préhistoriques, principalement des viandes maigres, des fruits, et des légumes.',
        'Méditerranéen': 'Un régime basé sur l’alimentation traditionnelle des pays bordant la mer Méditerranée, riche en légumes, fruits, poisson, et huile d’olive.'
      };
      setRegimeDescriptions(descriptions);
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

  const handleRegimeSelection = (regime) => {
    setLookingForRegime(prevState => {
      if (prevState.includes(regime)) {
        return prevState.filter(item => item !== regime);
      } else {
        return [...prevState, regime];
      }
    });
  };

  const handleAgeSelection = (ageRange) => {
    const updatedLookingAge = [...lookingAge];
    if (updatedLookingAge.includes(ageRange)) {
      const index = updatedLookingAge.indexOf(ageRange);
      updatedLookingAge.splice(index, 1);
    } else {
      updatedLookingAge.push(ageRange);
    }
    setLookingAge(updatedLookingAge);
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
          lookingFor: lookingFor,
          lookingAge: lookingAge,
          lookingForRegime: lookingForRegime,
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
    <PaperProvider>
      <Container.BasicView style={styles.mainContainer}>
        <Container.BasicScrollView>
          <Container.BasicView style={styles.headerContainer}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
              <SvgFlecheRetour />
              <SvgXml xml={svgSource} style={styles.image} />
            </TouchableOpacity>
            <Text.Base style={styles.title}>{title}</Text.Base>
          </Container.BasicView>

          {/* Section pour sélectionner le genre avec des boutons */}
          <Text.Base style={styles.title}>Genre</Text.Base>
          <Text.Base style={styles.titleh2}>Clique sur le tag qui correspond au genre des colocs que tu cherches :</Text.Base>
          <Container.BasicView style={styles.genderSelectionContainer}>
            <TouchableOpacity
              style={[styles.genderButton, lookingFor === 'Homme' && styles.selectedGender]}
              onPress={() => setLookingFor('Homme')}
            >
              <Text.Base style={styles.genderText}>Homme</Text.Base>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, lookingFor === 'Femme' && styles.selectedGender]}
              onPress={() => setLookingFor('Femme')}
            >
              <Text.Base style={styles.genderText}>Femme</Text.Base>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, lookingFor === 'Peu importe' && styles.selectedGender]}
              onPress={() => setLookingFor('Peu importe')}
            >
              <Text.Base style={styles.genderText}>Autre</Text.Base>
            </TouchableOpacity>
          </Container.BasicView>

          {/* Section pour sélectionner le genre avec des boutons */}
          <Text.Base style={styles.title}>Âge</Text.Base>
          <Text.Base style={styles.titleh2}>Clique sur le tag qui correspond à la ou aux tranches d'âges des colocs que tu cherches :</Text.Base>
          <Container.BasicView style={styles.ageSelectionContainer}>
            {['Peu importe', '20 - 30 ans', '30 - 40 ans', '40 - 50 ans', '50+'].map((ageRange, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.ageButton, lookingAge.includes(ageRange) && styles.selectedGender]}
                onPress={() => handleAgeSelection(ageRange)}
              >
                <Text.Base style={styles.ageText}>{ageRange}</Text.Base>
              </TouchableOpacity>
            ))}
          </Container.BasicView>


          {/* Section pour les traits de caractère */}
          <Text.Base style={styles.title}>Caractère</Text.Base>
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
                style={styles.loisirItemNoSelect}
              >
                <Text.Base style={styles.loisirText}>{trait}</Text.Base>
              </TouchableOpacity>
            ))}
          </Container.BasicView>

          
          <Text.Base style={styles.title}>Régime alimentaire</Text.Base>
          <Text.Base style={styles.titleh2}>Clique sur les régimes alimentaires que tu recherches :</Text.Base>

          {/* Sélection des régimes alimentaires */}
          <Container.BasicView style={styles.regimeSelectionContainer}>
            <Container.BasicView style={styles.column}>
              {['Tout', 'Hypocalorique', 'Diète cétogène', 'Méditerranéen'].map((regime, index) => (
                <Container.BasicView key={index} style={styles.regimeItem}>
                  <Container.BasicView style={styles.checkBorder}>
                    <Checkbox
                      status={lookingForRegime.includes(regime) ? 'checked' : 'unchecked'}
                      onPress={() => handleRegimeSelection(regime)}
                    />
                  </Container.BasicView>
                  <Text.Base style={styles.regimeText}>{regime}</Text.Base>
                  <TouchableOpacity
                    style={styles.infoIcon}
                    onPress={() => alert(regimeDescriptions[regime])}
                  >
                    <SvgInfo />
                  </TouchableOpacity>
                </Container.BasicView>
              ))}
            </Container.BasicView>

            <Container.BasicView style={styles.column}>
              {['Paléolithique', 'Végétarien', 'Flexitarien', 'Végan'].map((regime, index) => (
                <Container.BasicView key={index} style={styles.regimeItem}>
                  <Container.BasicView style={styles.checkBorder}>
                    <Checkbox
                      status={lookingForRegime.includes(regime) ? 'checked' : 'unchecked'}
                      onPress={() => handleRegimeSelection(regime)}
                    />
                  </Container.BasicView>
                  <Text.Base style={styles.regimeText}>{regime}</Text.Base>
                  <TouchableOpacity
                    style={styles.infoIcon}
                    onPress={() => alert(regimeDescriptions[regime])}
                  >
                    <SvgInfo />
                  </TouchableOpacity>
                </Container.BasicView>
              ))}
            </Container.BasicView>
          </Container.BasicView>

          {/* Bouton d'enregistrement */}
          <TouchableOpacity onPress={handleValidation} style={styles.button}>
            <Text.Base style={styles.buttonText}>Enregistrer</Text.Base>
          </TouchableOpacity>

          {/* Affichage du message de succès ou d'erreur */}
          {message && (
            <Container.BasicView
              style={[styles.messageContainer, messageType === 'success' ? styles.successMessage : styles.errorMessage]}
            >
              <Text.Base style={styles.messageText}>{message}</Text.Base>
            </Container.BasicView>
          )}
        </Container.BasicScrollView>
      </Container.BasicView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
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
  },
  titleh2: {
    fontSize: 18,
    fontWeight: 'normal',
    flex: 1,
    color: '#6D6D6D',
    textAlign: 'left',
    marginLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  regimeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  column: {
    width: '45%',
  },
  regimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkBorder: {
    borderWidth: 1,
    borderColor: 'black',
  },
  regimeText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  infoIcon: {
    marginLeft: 5,
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
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  genderSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  genderButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGender: {
    borderColor: '#7790ED',
  },
  genderText: {
    fontSize: 16,
    color: 'gray',
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
  ageSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  ageButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 16,
    color: 'gray',
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
    paddingBottom: 20,
    marginTop: -45
  },
  loisirItemNoSelect: {
    padding: 10,
    margin: 5,
    borderColor: '#6D6D6D',
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

export default ColocTemplate;
