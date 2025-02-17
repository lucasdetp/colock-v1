import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Container, Text } from '../../atoms';

const LargeBox = ({ imageSource, text, style }) => {
  return (
    <Container.BasicView style={[styles.container, style]}>
      {imageSource ? (
        <SvgXml xml={imageSource} style={styles.image} />
      ) : (
        <Text.Base style={styles.text}>{text}</Text.Base>
      )}
      <Text.Base style={styles.text}>{text}</Text.Base>
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Pour Android
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 100,  
    height: 100, 
    marginBottom: 10,
    bottom: 10,
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    textAlign: 'left',
    color: '#6D6D6D',
    fontFamily: 'CustomFontRegular',
  },
});

export default LargeBox;
