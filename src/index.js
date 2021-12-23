import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './LogIn'
import Contact from './Contact';
import FirstPage from './FirstPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function Routtes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="login" element={<LogIn />} />
      <Route path="contact" element={<Contact />} />
      <Route path="first" element={<FirstPage/>}/>
    </Routes>
   </BrowserRouter>
  );
}

ReactDOM.render(
  <Routtes/>
  , document.getElementById('root')
);
