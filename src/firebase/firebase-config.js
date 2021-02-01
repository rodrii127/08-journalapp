import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfMBcu80e53dwuJbPJfbB-yp9B_qu_8QI",
    authDomain: "react-app-cursos-3017f.firebaseapp.com",
    projectId: "react-app-cursos-3017f",
    storageBucket: "react-app-cursos-3017f.appspot.com",
    messagingSenderId: "896932484798",
    appId: "1:896932484798:web:85264635dd2f74b67e30ef"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }