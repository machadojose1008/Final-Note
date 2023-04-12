import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from "./routes/signin/signIn";
import SignUpForm from './routes/signup/sign-up-form.component';
import App from './App';
import './fonts/gundaly/Gundaly.ttf'






const root = ReactDOM.createRoot(document.getElementById('finalnote-container'));

root.render(

  <Router>

    <Routes>
      <Route path='/' element={<SignIn/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/app" element={<App />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  </Router>
);

