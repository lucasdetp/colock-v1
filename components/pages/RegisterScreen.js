import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { RegisterTemplate } from '../templates';
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
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [coloc, setColoc] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleSwitch = () => setColoc(prev => !prev);

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setConfirmPassword(newPassword); 
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error('Les mots de passe ne correspondent pas');
      return;
    }
    
    try {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const data = {
        _id: userCred.user.uid,
        fullName: name,
        lastName: lastName,
        isColoc: coloc,
        email: email,
        uid: userCred.user.uid,
      };
      await setDoc(doc(firestoreDB, 'users', userCred.user.uid), data);
      dispatch(SET_USER(data));
      navigation.navigate('WelcomeScreen');
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
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={handlePasswordChange}  
          setConfirmPassword={setConfirmPassword} 
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
