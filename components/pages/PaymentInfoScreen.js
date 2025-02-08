import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PaymentInfoTemplate from '../templates/PaymentInfoTemplate';

const PaymentInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <PaymentInfoTemplate />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});

export default PaymentInfoScreen;
