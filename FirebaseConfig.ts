// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCsu57VlE1dOBG-4WhS8Qi8mKKsHZpFK0",
  authDomain: "projectus-f3466.firebaseapp.com",
  projectId: "projectus-f3466",
  storageBucket: "projectus-f3466.appspot.com",
  messagingSenderId: "186573414415",
  appId: "1:186573414415:web:fdaae75c5642330e87437a",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
