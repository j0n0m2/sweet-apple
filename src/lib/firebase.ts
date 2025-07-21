import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEOYX00UmXZvUyPqgZFkZccL1OCi0I-bI',
  authDomain: 'sweet-apple-bc1b7.firebaseapp.com',
  projectId: 'sweet-apple-bc1b7',
  storageBucket: 'sweet-apple-bc1b7.firebasestorage.app',
  messagingSenderId: '904025659303',
  appId: '1:904025659303:web:7bf5cd5dcde9a7b6cc0882',
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
