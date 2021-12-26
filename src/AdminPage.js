import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import Manage from "./managers/ManagerFacade";
import { Button} from 'react-bootstrap';
import "./app.css"

export default function AdminPage () {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [noOfRows, setNoOfRows] = useState(1);
    const [data, setData]= useState();
    const [show, setShow] = useState(false);
    const history = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchEventReqData = async () => {
        var reqs = await Manage("event").getAllEventRequests();
        setData(reqs);
        setNoOfRows(reqs);
    };

    const approve = async (eventId) => {
        await Manage("event").approveEventRequest(eventId);
    }
  
    const decline = async (eventId) => {
        await Manage("event").declineEventRequest(eventId);
    }

    const fetchUsername = async () => {
        const docRef = doc(db, "users", user.email);
        await getDoc(docRef).then((docSnap) => {
          const data = docSnap.data();
          setName(data.name);
          setRole(data.type);
        }).catch((error) => {
          console.log(error);
          alert("Fetch error");});
    };

    useEffect(async() => {
      if(loading) return;
      if (!user) return history("/");
      await fetchUsername().then(() => {
        fetchEventReqData()
      })
    }, [user, loading]);

    if(data == null) {
      return <div>loading...</div>
    }

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
        {data.map((elementInArray, index) => {
         
              return (
              
                <tr>
                <th scope="row">{index + 1}</th>
                <td><center>{data[index].getName()}</center></td>
                <td><center>{data[index].getClub()}</center></td>
                <td><center>{data[index].getDateRequested()}</center></td>
                <td><center>{data[index].getTimeRequested()}</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm" onClick={() => {approve(data[index].getId())}}>
                    Accept
                    </Button>
                    <Button variant="primary" size="sm" className="decline-delete" onClick={() => {decline(data[index].getId())}}>
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
