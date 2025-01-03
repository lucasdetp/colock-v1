import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Text } from '../../atoms';

const SmallBox = ({ svgSource, text, style }) => {
  return (
    <View style={[styles.container, style]}>
      {svgSource ? (
        // Affiche directement le SVG en utilisant SvgXml
        <SvgXml xml={svgSource} style={styles.image} />
      ) : (
        // Vous pouvez ajouter un fallback ici (ex. image ou texte)
        <View style={styles.fallbackContent}></View>
      )}
      <Text.Base style={styles.text}>{text}</Text.Base>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 60,
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
  text: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3A3A3A',
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
