import React, { Component, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import { Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Manage from "./managers/ManagerFacade";

import "./app.css"

export default function Clubs () {
  const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false);
    const [noOfRows, setNoOfRows] = useState(1);
    const [users, setUsers] = useState([])
    const [activeItem, setActiveItem] = useState(0)


    const handleClose = () => {
      setShow(false);
    }
    const handleShow = (item) => {
      setActiveItem(item)
      setShow(true);
    }
    const history = useNavigate();

    const fetchClubData = async () => {
      var b = await Manage("event").getAllUsers()
      console.log(b)
      setUsers(b.filter(element => element.getEvents() != undefined))
    }

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

    useEffect(async() => {
      if(loading) return;
      if (!user) return history("/");
      await fetchUsername()
      await fetchClubData()

    }, [user, loading]);

    if(!users) {
      return <div>loading...</div>
    }
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
</nav><div className="app container p-5">
      <table class="table table-hover table-bordered p-5">
        <thead>
          <tr>
            
            <th scope="col">#</th>
            <th scope="col"><center>Club Name</center></th>
            <th scope="col"><center>Details</center></th>
            
            
          </tr>
        </thead>
        <tbody>
        {users.map((elementInArray, index) => {
         
              return (
              
                <tr>
                <th scope="row">{index + 1}</th>
                <td><center>{users[index].getName()}</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm" onClick={() => handleShow(index)}>
                    Show More
                    </Button>
                    </center>
                </div>
                

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{users[activeItem].getName()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Advisor 🧑‍🏫: {users[activeItem].getClubAdvisor()}</p>
          <p>Description✏️: {users[activeItem].getDescription()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              </tr>
                );
            })}
            
        </tbody>
            </table>
       </div>
</>
    );
}

