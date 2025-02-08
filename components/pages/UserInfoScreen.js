import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserInfoTemplate from '../templates/UserInfoTemplate';

const UserInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <UserInfoTemplate />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default UserInfoScreen;
