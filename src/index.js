import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './LogIn'
import Contact from './Contact';
import FirstPage from './FirstPage';
import Calendar from './Calendar';
import AdminPage from './AdminPage';
import Clubs from './Clubs';
import 'bootstrap/dist/css/bootstrap.min.css';
import SACAdmin from './SACAdmin';

function Routtes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="login" element={<LogIn />} />
      <Route path="contact" element={<Contact />} />
      <Route path="first" element={<FirstPage/>}/>
      <Route path="admin" element={<AdminPage/>}/>
      <Route path="calendar" element={<Calendar/>}/>
      <Route path="clubs" element={<Clubs />}/>
      <Route path="sacadmin" element={<SACAdmin/>}/>
    </Routes>
   </BrowserRouter>
  );
}

ReactDOM.render(
  <Routtes/>
  , document.getElementById('root')
);
