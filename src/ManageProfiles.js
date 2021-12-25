import React, { Component, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import { Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import "./app.css"

export default function ManageProfiles () {
  const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false);
    const [noOfRows, setNoOfRows] = useState(1);

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
      
      if (!user) return history("/");
      fetchUsername();
    }, [user]);

    return(
      <>
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
          <a class="nav-link" href="/first">Event List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/calendar">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/clubs">Clubs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/finance">Finance</a>
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
        <button type="button" class="btn btn-primary logout-button" onClick={logout}>Logout</button>
        
      
    </div>
    
  </div>
</nav>
<div className="app container p-5">
      <table class="table table-hover table-bordered p-5">
        <thead>
          <tr>
            
            <th scope="col">#</th>
            <th scope="col"><center>Profile Name</center></th>
            <th scope="col"><center>ID</center></th>
            <th scope="col"><center>Operations</center></th>
            
            
          </tr>
        </thead>
        <tbody>
        {[...Array(noOfRows)].map((elementInArray, index) => {
         
              return (
              
                <tr>
                <th scope="row">{index}</th>
                <td><center>Kaan Özaltan</center></td>
                <td><center>21902695</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm" >
                    Delete (add onclick)
                    </Button>
                    </center>
                </div>
                

      
              </tr>
                );
            })}
            
        </tbody>
            </table>
       </div>
</>
    );
}

