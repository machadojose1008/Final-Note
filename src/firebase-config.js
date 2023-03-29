// Arquivo de configuração do Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBllhFpOow-uXGgQuCzdMl15F3bRUgrGbQ",
    authDomain: "final-note-29240.firebaseapp.com",
    projectId: "final-note-29240",
    storageBucket: "final-note-29240.appspot.com",
    messagingSenderId: "977161321469",
    appId: "1:977161321469:web:393d4a2f68b88f02fc7794",
    measurementId: "G-5RD64YER7L"
  };

// Inicialize o SDK do Firebase com as suas configurações
const app = initializeApp(firebaseConfig);

// Crie uma referência para o banco de dados Firestore
const db = getFirestore(app);

export default db;