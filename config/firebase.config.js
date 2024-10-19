import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD-xd8jRmbj7VDuusysCXk4MmKOKy_AdUs",
    authDomain: "colock-cata.firebaseapp.com",
    projectId: "colock-cata",
    storageBucket: "colock-cata.appspot.com",
    messagingSenderId: "500573600084",
    appId: "1:500573600084:web:23c3b76872c7cd45c970c1"
};

// Initialiser l'application Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialiser Firebase Auth avec persistance via AsyncStorage
let firebaseAuth;
if (getApps().length > 0) {
    firebaseAuth = getAuth(app);
} else {
    firebaseAuth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
}

// Initialiser Firestore et Storage
const firestoreDB = getFirestore(app);
const storage = getStorage(app);

export { app, firebaseAuth, firestoreDB, storage };

