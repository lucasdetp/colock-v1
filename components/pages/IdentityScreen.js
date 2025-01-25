import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import IdentityTemplate from '../templates/IdentityTemplate';

const identityData = [
  {
    svgSource: `
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.91" d="M24.3222 24.1503C28.7975 22.3331 31.9796 17.8049 31.9796 12.5013C31.9796 5.61138 26.6081 0 20 0C13.3919 0 8.02042 5.61138 8.02042 12.5013C8.02042 17.8049 11.2082 22.3331 15.6778 24.1503C6.7215 26.222 0 34.5621 0 44.5182C0 48.6438 3.21611 52 7.1696 52H32.8304C36.7839 52 40 48.6438 40 44.5182C40 34.5562 33.2785 26.222 24.3222 24.1503Z" fill="#7790ED"/>
      </svg>
    `,
    title: 'Tu te définis comme ...',
  }
];

const IdentityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {identityData.map((item, index) => (
          <IdentityTemplate 
            key={index}
            svgSource={item.svgSource}
            title={item.title}
          />
        ))}
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

export default IdentityScreen;
