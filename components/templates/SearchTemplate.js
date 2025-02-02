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

const SearchTemplate = ({ svgSource, title, percentage, infoBoxData }) => {
  const navigation = useNavigation();
  return (
    <Container.BasicView style={styles.mainContainer}>
      <Container.BasicView style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
          <SvgFlecheRetour />
        </TouchableOpacity>
        <SvgXml xml={svgSource} style={styles.image} />
        <Text.Base style={styles.title}>{title}</Text.Base>
        <Container.BasicView style={styles.percentageCircle}>
          <Text.Base style={styles.percentage}>{percentage}%</Text.Base>
        </Container.BasicView>
      </Container.BasicView>

      {/* Container pour les boutons et les formulaires */}
      {infoBoxData.map((item, index) => (
          <InfoBox 
            key={index}
            svgSource={item.svgSource}
            text={item.text}
            percentage={item.percentage}
            onPress={item.onPress}
          />
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
  goBack: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
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
  
});

export default SearchTemplate;
