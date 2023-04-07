import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from "./signin/signIn";
import SignUp from "./signup/signUp";
import App from './app/App';
import Login from './login/login';
import './fonts/gundaly/Gundaly.ttf'






const root = ReactDOM.createRoot(document.getElementById('finalnote-container'));

root.render(
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/app" element={<App/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />   
    </Routes>
  </Router>
);

