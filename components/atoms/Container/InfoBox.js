import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { fleche } from '../../../assets';
const InfoBox = ({ svgSource, text, percentage, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {svgSource && <SvgXml xml={svgSource} style={styles.image} />}

      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>

      {(percentage !== undefined) && (
        <View style={styles.percentageArrowContainer}>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      )}
      <Image source={fleche} style={styles.logo} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    elevation: 3,
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
