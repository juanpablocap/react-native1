import firebase from "firebase"; 
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDDccjCGc8ZouqXL-ooaznw4C41xlzL47w",
    authDomain: "fir-blanco.firebaseapp.com",
    projectId: "fir-blanco",
    storageBucket: "fir-blanco.appspot.com",
    messagingSenderId: "503679504701",
    appId: "1:503679504701:web:2cdd55afaf81c9b447b554"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
      firebase,
      db
  };