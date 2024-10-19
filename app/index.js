// app/index.js
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Store from '@/context/store';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

const App = () => {
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
      <Stack screenOptions={{ headerShown: false }}>
        {isRegistered ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="Register" />
        )}
      </Stack>
    </Provider>
  );
};

export default App;
