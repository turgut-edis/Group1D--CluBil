import React, { Component, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Manage from "./managers/ManagerFacade";

export default function Calendar (){
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [eventData, setEventData] = useState()
    const [registeredEvents, setRegisteredEvent] = useState([])
    const [newEventsData, setNewData] = useState([])
    const history = useNavigate();

    const fetchUsername = async () => {
      try {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        setName(data.name);
        setRole(data.type);
        setRegisteredEvent(data.registeredEvents)
      } catch (err) {
        console.log(err);
        alert("Fetch error");
      }
    };

    const fetchEventData = async () => {
      var b = await Manage("event").getAllEvents()
      setEventData(b)
    }

    useEffect(async () => {
      if(loading) return;
      if (!user) return history("/");
      console.log("business")
      await fetchUsername()
      await fetchEventData()
      
    }, [loading, user]);
    
    function getDate(dayString) {
      const today = new Date();
      const year = today.getFullYear().toString();
      let month = (today.getMonth() + 1).toString();
    
      if (month.length === 1) {
        month = "0" + month;
      }
    
      return dayString.replace("YEAR", year).replace("MONTH", month);
    }
    console.log(eventData)

   

    if(eventData == null) {
      return <div>loading...</div>
    }

    if(newEventsData.length == 0)
    {
      console.log(eventData, 'ED')
    eventData.forEach(element => {
          console.log(element)
          if(element.getParticipants().indexOf(user.email) > -1) {
                setNewData(newEventsData => [...newEventsData, {
                  title: element.getName(),
                  start: getDate(element.getDateRequested()),
                  end: getDate(element.getDateRequested())
                }]
                )
      
      }});
    }
    console.log(newEventsData)
    return (
      
      <div>
        <nav class="navbar navbar-expand-sm navbar-dark navbar-custom">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="navbar-brand mt-2 mt-lg-0" href="#">
                <img
                  src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
                  height="35"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </a>

              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/first">
                    Event List
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/calendar">
                    Calendar
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/clubs">
                    Clubs
                  </a>
                </li>
                
              </ul>
            </div>

            <div class="d-flex align-items-center">
            <div class="navbar-text username-css">{name}</div>
              <a href="/userprofilepage">
              <img
                src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
                class="rounded-circle"
                height="35"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
              </a>
              <button type="button" class="btn btn-primary logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        <div className="App">
      <div className="Calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin]}
        events={newEventsData}
        displayEventEnd="true"
        eventColor={"blue"}
        eventClick={() => console.log("press!")}
      />
      </div>
      
    </div>
      </div>
    );
  }
