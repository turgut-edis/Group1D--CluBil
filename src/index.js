import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './LogIn'
import Contact from './Contact';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="login" element={<LogIn />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
   </BrowserRouter>
  , document.getElementById('root')
);
