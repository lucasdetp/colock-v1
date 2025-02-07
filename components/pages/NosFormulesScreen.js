import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import NosFormulesTemplate  from '../templates/NosFormulesTemplate';

const NosForumulesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <NosFormulesTemplate />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default NosForumulesScreen;
