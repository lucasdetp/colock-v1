import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import TextPlaceholder from '../atoms/Text/Base';
import { AccountPictureName, ThreeSmallBoxes } from '../organims';
import LargeBox from '../atoms/Container/LargeBox';
import InfoBox from '../atoms/Container/InfoBox';
import { Container, Text } from '../atoms';
import SvgReglage from '../../assets/svg/reglage';
import { firebaseAuth } from '../../config/firebase.config';
import { useNavigation } from '@react-navigation/native';

const AccountScreenTemplate = ({ userName, profilePic, additionalDetails, boxImages, largeBoxData, infoBoxData, }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Container.BasicView style={styles.svgContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <SvgReglage width={30} height={30} />
          </TouchableOpacity>

          {menuVisible && (
            <TouchableOpacity onPress={handleLogout}>
              <Container.BasicView style={styles.menu}>
                <Text.Base style={styles.menuText}>Déconnexion</Text.Base>
              </Container.BasicView>
            </TouchableOpacity>
          )}
        </Container.BasicView>

        <AccountPictureName
          source={{ uri: profilePic }}
          userName={userName}
          style={styles.imageAccount}
          textStyle={styles.userNameText}
        />

        {/* Informations Supplémentaires */}
        {additionalDetails && (
          <Container.BasicView style={styles.detailsBox}>
            <TextPlaceholder style={styles.additionalDetails}>
              {additionalDetails}
            </TextPlaceholder>
          </Container.BasicView>
        )}

        <ThreeSmallBoxes boxImages={boxImages} />
        {largeBoxData && (
          <LargeBox
            imageSource={largeBoxData.imageSource}
            text={largeBoxData.text}
            style={styles.boxStyle}
          />
        )}
        <Container.BasicView style={styles.boxdesc}>
          <Text.Base style={styles.desc}>Complète ton profil :</Text.Base>
        </Container.BasicView>
        {infoBoxData.map((item, index) => (
          <InfoBox 
            key={index}
            svgSource={item.svgSource}
            text={item.text}
            percentage={item.percentage}
            onPress={item.onPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  svgContainer: {
    position: 'absolute',
    top: 10,  
    right: 10, 
    zIndex: 100,
  },
  menu: {
    position: 'absolute',
    top: 5, 
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 200,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'FilsonProMedium',
    zIndex: 200,
    width: "150",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
   fontWeight: 'bold',
   fontSize: 20,
   fontFamily: "FilsonProMedium"
  },
  boxStyle: {
    marginTop: 15,
    marginBottom: 15,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageAccount: {
    marginBottom: 20,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalDetails: {
    fontSize: 14,
    padding: 10,
    color: '#555',
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  detailsBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Pour Android
    width: '95%',
    alignSelf: 'center',
  },
  boxdesc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
  },
  smallBox: {
    width: 90,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Pour Android
  },
});

export default AccountScreenTemplate;
