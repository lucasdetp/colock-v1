import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text } from '../atoms';
import SvgCroix from '../../assets/svg/croix';


const LikesTemplate = ({ navigateToNextStep, saveLoisirsData }) => {
  const [podium, setPodium] = useState([null, null, null]);
  const [loisirs, setLoisirs] = useState([
    "Sport", "Musique", "Voyages", "Histoire", "Photographie", "Cinéma", "Cuisine",
    "Peinture et dessin", "Art", "Technologie", "Jeux vidéos", "E-sport", "Nature",
    "Animaux", "Science", "Culture générale", "Séries"
  ]);

  const addToPodium = (loisir) => {
    const availableSpotIndex = podium.findIndex(spot => spot === null);
    if (availableSpotIndex !== -1) {
      const newPodium = [...podium];
      newPodium[availableSpotIndex] = loisir;
      setPodium(newPodium);

      const newLoisirs = loisirs.filter(item => item !== loisir);
      setLoisirs(newLoisirs);
    }
  };
  
  const handleValidation = () => {
    saveLoisirsData(podium);
    navigateToNextStep();
  };

  const removeFromPodium = (index) => {
    const newPodium = [...podium];
    const loisirToRemove = newPodium[index];

    if (loisirToRemove) {
      setLoisirs([...loisirs, loisirToRemove]);
      newPodium[index] = null;
      setPodium(newPodium);
    }
  };

  return (
    <Container.BasicView style={styles.container}>
      <Text.Base style={styles.title}>Trois choses que tu aimes</Text.Base>

      <Container.BasicView style={styles.podiumContainer}>
        <Container.BasicView style={styles.podiumRow}>
          <Container.BasicView style={styles.podiumItemContainer}>
            <Container.BasicView style={styles.podiumTitleContainer}>
              <Text.Base style={styles.podiumTitle}>{podium[1] || "Loisir 2"}</Text.Base>
              {podium[1] && (
                <TouchableOpacity onPress={() => removeFromPodium(1)} style={styles.removeButtonOutside}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix/>
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
              <Text.Base style={styles.podiumTitle}>{podium[0] || "Loisir 1"}</Text.Base>
              {podium[0] && (
                <TouchableOpacity onPress={() => removeFromPodium(0)} style={styles.removeButtonOutside}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix/>
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
              <Text.Base style={styles.podiumTitle}>{podium[2] || "Loisir 3"}</Text.Base>
              {podium[2] && (
                <TouchableOpacity onPress={() => removeFromPodium(2)} style={styles.removeButtonOutside}>
                  <Text.Base style={styles.removeText}>
                    <SvgCroix/>
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
        {loisirs.map((loisir, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => addToPodium(loisir)}
            style={styles.loisirItem}
          >
            <Text.Base style={styles.loisirText}>{loisir}</Text.Base>
          </TouchableOpacity>
        ))}
      </Container.BasicView>
        <TouchableOpacity onPress={handleValidation} style={styles.button}>
            <Text.Base style={styles.buttonText}>Valider 4/5</Text.Base>
        </TouchableOpacity>
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
  }, 
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    paddingRight: 30,  // Ajout d'espace pour la croix
    maxWidth: 150,  // Définir une largeur maximale
    flexShrink: 1,  // Permet au texte de s'adapter
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
    backgroundColor: '#f0f0f0',
  },
  level1: {
    height: 150,
    width: 120,
    backgroundColor: '#ffd700',
  },
  level2: {
    height: 110,
    width: 110,
    backgroundColor: '#c0c0c0',
    marginTop: 40,
  },
  level3: {
    height: 90,
    width: 100,
    backgroundColor: '#cd7f32',
    marginTop: 60,
  },
  podiumText: {
    fontSize: 20,
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
});

export default LikesTemplate;