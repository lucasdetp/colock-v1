import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SvgFlecheSuivant from '../../../assets/svg/flecheSuivant';
import { Container, Text } from '../../atoms';
const InfoBox = ({ svgSource, text, percentage, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {svgSource && <SvgXml xml={svgSource} style={styles.image} />}

      <Container.BasicView style={styles.textContainer}>
        <Text.Base style={styles.text}>{text}</Text.Base>
      </Container.BasicView>

      {(percentage !== undefined) && (
        <Container.BasicView style={styles.percentageArrowContainer}>
          <Text.Base style={styles.percentage}>{percentage}%</Text.Base>
        </Container.BasicView>
      )}
      <SvgFlecheSuivant />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.10)', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    marginRight: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 5,
  },
  logo: {
    width: 14,
    height: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  percentageArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 15,
    color: '#6b6b6b',
    borderWidth: 2,
    borderColor: '#7790ED',
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  arrow: {
    fontSize: 20,
    color: '#007bff',
  },
});

export default InfoBox;
