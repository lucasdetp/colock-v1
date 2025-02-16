import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Container, Text } from '../atoms';
import SvgLogoWhite from '../../assets/svg/logoFullWhite';

const LoadScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Container.BasicView style={styles.centeredContainer}>
        <Text.Base style={styles.title}>Bienvenue sur</Text.Base>
        <SvgLogoWhite />
      </Container.BasicView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7790ED',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#3A3A3A',
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'CustomFontBold',
  },
});

export default LoadScreen;
