import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserPhotosTemplate from '../templates/UserPhotosTemplate';

const UserPhotosScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <UserPhotosTemplate />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default UserPhotosScreen;
