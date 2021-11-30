import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA0_FkgvlJjaNYsG6uSE-Td626xQeVa_08",
    authDomain: "agenda-iw-48a01.firebaseapp.com",
    projectId: "agenda-iw-48a01",
    storageBucket: "agenda-iw-48a01.appspot.com",
    messagingSenderId: "167008297125",
    appId: "1:167008297125:web:16e9bc5bd8ec7f7dad2d4c"
  };

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)

export const auth = getAuth(app)