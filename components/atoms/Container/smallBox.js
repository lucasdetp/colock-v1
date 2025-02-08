import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Container, Text } from '../../atoms';

const SmallBox = ({ svgSource, text, style }) => {
  return (
    <Container.BasicView style={[styles.container, style]}>
      {svgSource ? (
        <SvgXml xml={svgSource} style={styles.image} />
      ) : (
        <View style={styles.fallbackContent}></View>
      )}
      <Text.Base style={styles.text}>{text}</Text.Base>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3A3A3A',
    flexWrap: 'wrap',
    width: '80%',
    marginTop: 10,
  },
  image: {
    width: 100,  
    height: 100, 
  },
  fallbackContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
  },
});

export default SmallBox;
