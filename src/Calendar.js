import React, { Component, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar (){
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
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
      } catch (err) {
        console.log(err);
        alert("Fetch error");
      }
    };

    useEffect(() => {
      if (loading) return;
      if (!user) return history("/", { replace: true });
      fetchUsername();
    }, [user, loading]);
    const events = [
      { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
      {
        title: "Long Event",
        start: getDate("YEAR-MONTH-07"),
        end: getDate("YEAR-MONTH-10")
      },
      {
        groupId: "999",
        title: "Repeating Event",
        start: getDate("YEAR-MONTH-09T16:00:00+00:00")
      },
      {
        groupId: "999",
        title: "Repeating Event",
        start: getDate("YEAR-MONTH-16T16:00:00+00:00")
      },
      {
        title: "Conference",
        start: "YEAR-MONTH-17",
        end: getDate("YEAR-MONTH-19")
      },
      {
        title: "Meeting",
        start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
        end: getDate("YEAR-MONTH-18T12:30:00+00:00")
      },
      { title: "Lunch", start: getDate("YEAR-MONTH-18T12:00:00+00:00") },
      { title: "Birthday Party", start: getDate("YEAR-MONTH-19T07:00:00+00:00") },
      { title: "Meeting", start: getDate("YEAR-MONTH-18T14:30:00+00:00") },
      { title: "Happy Hour", start: getDate("YEAR-MONTH-18T17:30:00+00:00") },
      { title: "Dinner", start: getDate("YEAR-MONTH-18T20:00:00+00:00") }
    ];
    
    function getDate(dayString) {
      const today = new Date();
      const year = today.getFullYear().toString();
      let month = (today.getMonth() + 1).toString();
    
      if (month.length === 1) {
        month = "0" + month;
      }
    
      return dayString.replace("YEAR", year).replace("MONTH", month);
    }
    console.log("You're logged in as {role}")
    console.log("Your name is {name}")
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
                <li class="nav-item">
                  <a class="nav-link" href="/finance">
                    Finance
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
        events={events}
        displayEventEnd="true"
        eventColor={"#9932cc"}
      />
      </div>
      
    </div>
      </div>
    );
  }
