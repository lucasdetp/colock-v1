import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import TextPlaceholder from '../atoms/Text/Base';
import { AccountPictureName, ThreeSmallBoxes } from '../organims';
import LargeBox from '../atoms/Container/LargeBox';
import InfoBox from '../atoms/Container/InfoBox';
import { Container, Text } from '../atoms';

const AccountScreenTemplate = ({ userName, profilePic, additionalDetails, boxImages, largeBoxData, infoBoxData, }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AccountPictureName
          source={{ uri: profilePic }}
          userName={userName}
          style={styles.imageAccount}
          textStyle={styles.userNameText}
        />

        {/* Informations Supplémentaires */}
        {additionalDetails && (
          <View style={styles.detailsBox}>
            <TextPlaceholder style={styles.additionalDetails}>
              {additionalDetails}
            </TextPlaceholder>
          </View>
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
  container: {
    flex: 1,
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
