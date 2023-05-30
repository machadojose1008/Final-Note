import React from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './components/login/sign-up';
import SignInForm from './components/login/signin';
import SrsComponent from './components/srs/srs';
import App from './App';
import './utils/gundaly/Gundaly.ttf'






const root = createRoot(document.getElementById('finalnote-container'));

root.render(
  <Router>
    <Routes>
      <Route path='/' element={<SignInForm/>} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/app" element={<App />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path='/srs' element={<SrsComponent/>}/>
    </Routes>
  </Router>
);

