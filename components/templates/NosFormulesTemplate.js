import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Container } from '../atoms';
import { useNavigation } from 'expo-router';
import SvgNosFormules from '../../assets/svg/nosFormules';
import SvgLogo from '../../assets/svg/logo';
import SvgBoosts from '../../assets/svg/boosts';
import SvgPlatinium3 from '../../assets/svg/platinium3';

const NosFormulesTemplate = () => {
  const navigation = useNavigation();

  const features = [
    "Mise en avant du profil",
    "Boost (permet d’envoyer un message sans attendre le match en retour)"
  ];

  const features2 = [
    "Mise en avant du profil",
    "Boost (permet d’envoyer un message sans attendre le match en retour)",
    "Gestion de la vie de la coloc (centralisation de documents, chat de groupe, todo list...)",
  ];

  return (
    <Container.BasicView style={styles.container}>
      
      {/* Titre avec SVG centré */}
      <Container.BasicView style={styles.header}>
        <SvgNosFormules style={styles.icon} />
        <Text.Base style={styles.title}>Nos formules</Text.Base>
      </Container.BasicView>

      {/* Card avec SVG et texte */}
      <Container.BasicView style={styles.infoBox}>
        
        <Container.BasicView style={styles.svgContainer}>
          <SvgLogo style={styles.icon} />
          <SvgBoosts style={styles.icon} />
        </Container.BasicView>

        <Text.Base style={styles.infoText}>
          Offre hebdomadaire, fonctionnalités supplémentaires :
        </Text.Base>

        {/* Liste des fonctionnalités avec bullet points */}
        <Container.BasicView style={styles.listContainer}>
          {features.map((feature, index) => (
            <Container.BasicView key={index} style={styles.listItem}>
              <Text.Base style={styles.bullet}>•</Text.Base>
              <Text.Base style={styles.listText}>{feature}</Text.Base>
            </Container.BasicView>
          ))}
        </Container.BasicView>

        <Text.Base style={styles.infoText}>
          {"\n"}Le tout pour 9,90€ seulement !
        </Text.Base>
        
        <TouchableOpacity style={styles.button}>
          <Text.Base style={styles.buttonText}>Mettre en avant mon profil</Text.Base>
        </TouchableOpacity>
      </Container.BasicView>
      <Container.BasicView style={styles.infoBox}>
        
        <View style={styles.svgContainer}>
          <SvgLogo style={styles.icon} />
          <SvgPlatinium3 style={styles.icon} />
        </View>

        <Text.Base style={styles.infoText}>
          Offre annuelle, fonctionnalités supplémentaires :
        </Text.Base>

        {/* Liste des fonctionnalités avec bullet points */}
        <View style={styles.listContainer}>
          {features2.map((feature, index) => (
            <View key={index} style={styles.listItem}>
              <Text.Base style={styles.bullet}>•</Text.Base>
              <Text.Base style={styles.listText}>{feature}</Text.Base>
            </View>
          ))}
        </View>

        <Text.Base style={styles.infoText}>
          {"\n"}Le tout pour 9,90€ seulement !
        </Text.Base>
        
        <TouchableOpacity style={styles.button}>
          <Text.Base style={styles.buttonText}>Accélérer mon profil</Text.Base>
        </TouchableOpacity>
      </Container.BasicView>

    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 10, 
    marginBottom: 20,
  },
  icon: {
    width: 30, 
    height: 30, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '90%', // Assure une largeur uniforme
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    marginBottom: 20, // Ajoute un espace entre les cartes
  },
  svgContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  listContainer: {
    alignSelf: 'flex-start',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 18,
    marginRight: 5,
  },
  listText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C9DDFC',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NosFormulesTemplate;
