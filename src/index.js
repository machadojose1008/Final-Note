import React from 'react';
import { createRoot} from 'react-dom/client';
import './index.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './routes/signin-signup/sign-up-form.component';
import SignInForm from './routes/signin-signup/sign-in-form.component';
import SrsComponent from './components/srs/srs';
import App from './App';
import './fonts/gundaly/Gundaly.ttf'






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

