// components/pages/RegisterScreen.js
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import {RegisterTemplate} from '../templates';
import { Logo } from '../../assets/index'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { SET_USER } from '../../context/actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [coloc, setColoc] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleSwitch = () => setColoc(prev => !prev);

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const data = {
        _id: userCred.user.uid,
        fullName: name,
        isColoc: coloc,
        email: email,
        uid: userCred.user.uid,
      };
      await setDoc(doc(firestoreDB, 'users', userCred.user.uid), data);
      dispatch(SET_USER(data));
      navigation.navigate('AddPictureScreen', { userId: userCred.user.uid });
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <RegisterTemplate
          logo={Logo}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          coloc={coloc}
          toggleSwitch={toggleSwitch}
          handleRegister={handleRegister}
          navigateToLogin={() => navigation.navigate('Login')} 
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
