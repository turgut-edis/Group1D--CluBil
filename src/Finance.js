import React, { Component, useEffect, useState } from "react";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import Modal from "react-bootstrap/Modal";
import { Button} from 'react-bootstrap';

export default function Finance () {

    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const history = useNavigate();
    const [noOfRows, setNoOfRows] = useState(1);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

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

    useEffect(async () => {
      if(loading) return;
      if (!user) return history("/");
      await fetchUsername();
    }, [user, loading]);

    return(
      <>
      <nav class="navbar navbar-expand-sm navbar-dark navbar-custom-clubmanager">
 
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
          <a class="nav-link" href="/eventlistclub">Event List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/calendarclub">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/clubsclub">Clubs</a>
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
            <th scope="col"><center>Event Name</center></th>
            <th scope="col"><center>Budget</center></th>
            <th scope="col"><center>Spent</center></th>
            <th scope="col"><center>Operations</center></th>
            
            
          </tr>
        </thead>
        <tbody>
        {[...Array(noOfRows)].map((elementInArray, index) => {
         
              return (
              
                <tr>
                <th scope="row">{index}</th>
                <td><center>Pizza</center></td>
                <td><center>300</center></td>
                <td><center>200</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm">
                    Delete Budget (add onclick)
                    </Button>
                    </center>
                </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
        <div className="popup-info-holder">
            <div>Event Name:</div>
            <input type="text" name="name"/>
            </div>
            <div className="popup-info-holder">
            <div>Budget:</div>
            <input type="text" name="name"/>
            </div>
            <div className="popup-info-holder">
            <div>Spent:</div>
            <input type="text" name="name"/>
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Set Budget
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="popup-info-container">
            <div className="popup-info-holder">
            <div>Club Name:</div> <div>data</div>
            </div>
            <div className="popup-info-holder">
            <div>Current Monthly Budget:</div> <div>data</div>
            </div>
            <div className="popup-info-holder">
            <div>New Monthly Budget:</div>
            <input type="text" name="name" />
            </div>
            <div className="popup-info-holder">
            <div>Reason:</div>
            <input type="text" name="name"/>
            </div>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            Set Budget
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
              </tr>
                );
            })}
            
        </tbody>
        
            </table>
            <button type="button" class="btn btn-primary add-event-budget-button" onClick={handleShow}>
         Add Event
       </button>
       <button type="button" class="btn btn-primary" onClick={handleShow2}>
         Change Budget Request
       </button>
       </div>
       </>
    );
}