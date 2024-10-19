// app/tabs/_layout.js
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Store from '@/context/store';
import { getAuth } from 'firebase/auth';
import AppNavigator from '../app/navigator/AppNavigator'; // Assure-toi que le chemin est correct

const Layout = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsRegistered(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
};

export default Layout;
