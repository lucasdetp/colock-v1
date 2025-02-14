import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LoginTemplate from '../templates/LoginTemplate';
import { Logo } from '../../assets/index';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../context/actions/userActions';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const docSnap = await getDoc(doc(firestoreDB, 'users', userCred.user.uid));

      if (docSnap.exists()) {
        dispatch(SET_USER(docSnap.data()));
        navigation.navigate('Main');
      }
    } catch (err) {
      console.error('Erreur : ', err.message);
      setAlert(true);
      setAlertMessage(
        err.message.includes('wrong-password')
          ? 'Mot de passe incorrect'
          : err.message.includes('user-not-found')
          ? 'Utilisateur non trouvé'
          : 'Email ou mot de passe incorrect'
      );

      setTimeout(() => setAlert(false), 5000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LoginTemplate
          logo={Logo}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          alert={alert}
          alertMessage={alertMessage}
          navigateToRegister={() => navigation.navigate('Register')}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
