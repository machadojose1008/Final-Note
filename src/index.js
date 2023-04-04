import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from "./signin/signIn";
import SignUp from "./signup/signUp";
import App from './app/App';






const root = ReactDOM.createRoot(document.getElementById('finalnote-container'));

root.render(
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/app" element={<App/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  </Router>
);

