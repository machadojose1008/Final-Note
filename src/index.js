import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBllhFpOow-uXGgQuCzdMl15F3bRUgrGbQ",
  authDomain: "final-note-29240.firebaseapp.com",
  projectId: "final-note-29240",
  storageBucket: "final-note-29240.appspot.com",
  messagingSenderId: "977161321469",
  appId: "1:977161321469:web:393d4a2f68b88f02fc7794",
  measurementId: "G-5RD64YER7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('finalnote-container'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
