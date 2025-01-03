import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const LargeBox = ({ imageSource, text, style }) => {
  return (
    <View style={[styles.container, style]}>
      {imageSource ? (
        // Si l'image source est un SVG XML, utilisez SvgXml
        <SvgXml xml={imageSource} style={styles.image} />
      ) : (
        // Si vous n'avez pas de SVG, vous pouvez afficher du texte ou une autre image
        <Text style={styles.text}>{text}</Text>
      )}
      {/* Texte sous l'image */}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 200,
    padding: 10,
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
    marginBottom: 20,
    bottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    color: '#6D6D6D',
  },
});

export default LargeBox;
