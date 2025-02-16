import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Container, Text } from '../atoms';
import InfoBox from '../atoms/Container/InfoBox';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { useNavigation } from 'expo-router';

const AboutMe2Template = ({ svgSource, title, percentage, infoBoxData }) => {
  const navigation = useNavigation();
  return (
    <Container.BasicView style={styles.mainContainer}>
      <Container.BasicView style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
          <SvgFlecheRetour />
          <SvgXml xml={svgSource} style={styles.image} />
        </TouchableOpacity>
        <Text.Base style={styles.title}>{title}</Text.Base>
        <Container.BasicView style={styles.percentageCircle}>
          <Text.Base style={styles.percentage}>{percentage}%</Text.Base>
        </Container.BasicView>
      </Container.BasicView>

      {/* Container pour les boutons et les formulaires */}
        {infoBoxData.map((item, index) => (
          <Container.BasicView key={index} style={styles.infoBoxContainer}>
            <InfoBox 
              key={index}
              svgSource={item.svgSource}
              text={item.text}
              onPress={item.onPress}
            />
          </Container.BasicView>
          ))}
      </Container.BasicView>
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
  infoBoxContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,  
    width: '100%', 
    padding: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: "CustomFontBoldLight",
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
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
  arrow: {
    width: 30,
    height: 17,
    tintColor: '#6D6D6D',
  },
  form: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
  },
  spacer: {
    marginVertical: 20,
  },
});

export default AboutMe2Template;
