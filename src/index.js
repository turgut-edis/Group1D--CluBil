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
import ClubManagerPage from './ClubManagerPage';
import Finance from './Finance';
import 'bootstrap/dist/css/bootstrap.min.css';
import SACAdmin from './SACAdmin';
import ManageProfiles from './ManageProfiles';
import UserProfilePage from './UserProfilePage';
import ManageClubs from './ManageClubs';
import EventListClub from './EventListClub';
import CalendarClub from './CalendarClub';
import ClubsClub from './ClubsClub';

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
      <Route path="clubmanager" element={<ClubManagerPage/>}/>
      <Route path="userprofilepage" element={<UserProfilePage/>}/>
      <Route path="finance" element={<Finance/>}/>
      <Route path="manageprofiles" element={<ManageProfiles/>}/>
      <Route path="manageclubs" element={<ManageClubs/>}/>
      <Route path="eventlistclub" element={<EventListClub/>}/>
      <Route path="calendarclub" element={<CalendarClub/>}/>
      <Route path="clubsclub" element={<ClubsClub/>}/>
    </Routes>
   </BrowserRouter>
  );
}

ReactDOM.render(
  <Routtes/>
  , document.getElementById('root')
);
