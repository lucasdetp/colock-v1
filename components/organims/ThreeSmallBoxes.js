import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../atoms';

const ThreeSmallBoxes = ({ boxImages = [] }) => {
  return (
    <Container.BasicView style={styles.container}>
      {boxImages.map((image, index) => (
        <Container.smallBox
          key={index}
          svgSource={image.svg1 || image.svg2 || image.svg3}
          text={image.text1 || image.text2 || image.text3}
          style={[styles.smallBox && styles.middleBox]} // Appliquer le style pour la boîte du milieu
        />
      ))}
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
    gap: 10,
  },
  smallBox: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  middleBox: {
    flex: 2,
  },
});

export default ThreeSmallBoxes;
