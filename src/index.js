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
import FinanceAdvisor from './FinanceAdvisor';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventListAdvisor from './EventListAdvisor';
import ManageProfiles from './ManageProfiles';
import UserProfilePage from './UserProfilePage';
import ManageClubs from './ManageClubs';
import EventListClub from './EventListClub';
import CalendarClub from './CalendarClub';
import ClubsClub from './ClubsClub';
import ClubsAdvisor from './ClubsAdvisor';

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
      <Route path="clubmanager" element={<ClubManagerPage/>}/>
      <Route path="userprofilepage" element={<UserProfilePage/>}/>
      <Route path="finance" element={<Finance/>}/>
      <Route path="manageprofiles" element={<ManageProfiles/>}/>
      <Route path="manageclubs" element={<ManageClubs/>}/>
      <Route path="eventlistclub" element={<EventListClub/>}/>
      <Route path="calendarclub" element={<CalendarClub/>}/>
      <Route path="clubsclub" element={<ClubsClub/>}/>
      <Route path="eventlistadvisor" element={<EventListAdvisor/>}/>
      <Route path="financeadvisor" element={<FinanceAdvisor/>}/>
      <Route path="clubsadvisor" element={<ClubsAdvisor/>}/>
    </Routes>
   </BrowserRouter>
  );
}

ReactDOM.render(
  <Routtes/>
  , document.getElementById('root')
);
