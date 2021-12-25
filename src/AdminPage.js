import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import Modal from "react-bootstrap/Modal";
import { Button} from 'react-bootstrap';
import "./app.css"

export default function AdminPage () {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [noOfRows, setNoOfRows] = useState(1);
    const [show, setShow] = useState(false);
    const history = useNavigate();

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    }, [user, loading]);

    return (
      <div>
        <nav class="navbar navbar-expand-sm navbar-dark navbar-custom-admin">
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
              <a class="navbar-brand mt-2 mt-lg-0" href="/first">
                <img
                  src="https://w3.bilkent.edu.tr/logo/ing-amblem.png"
                  height="35"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </a>

              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/admin">Manage Events</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageclubs">Manage Clubs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageprofiles">Manage Profiles</a>
                </li>
              </ul>
            </div>

            <div class="d-flex align-items-center">
            <div class="navbar-text username-css">{name}</div>
              <img
                src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
                class="rounded-circle"
                height="35"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
              <button type="button" class="btn btn-primary logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        <div className="app container p-5">
      <table class="table table-hover table-bordered p-5">
        <thead>
          <tr>
            
            <th scope="col">#</th>
            <th scope="col"><center>Event Name</center></th>
            <th scope="col"><center>Club</center></th>
            <th scope="col"><center>Date</center></th>
            <th scope="col"><center>Time Block</center></th>
            <th scope="col"><center>Operation</center></th>
            
            
          </tr>
        </thead>
        <tbody>
        {[...Array(noOfRows)].map((elementInArray, index) => {
         
              return (
              
                <tr>
                <th scope="row">{index}</th>
                <td><center>Pizza</center></td>
                <td><center>acm</center></td>
                <td><center>25/12/2021</center></td>
                <td><center>18:00-20:00</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm" onClick={handleShow}>
                    Accept
                    </Button>
                    <Button variant="primary" size="sm" className="decline-delete" onClick={handleShow}>
                    Delete
                    </Button>
                    </center>
                </div>
              </tr>
                );
            })}
            
        </tbody>
        
            </table>
       </div>
      </div>
    );
  }
