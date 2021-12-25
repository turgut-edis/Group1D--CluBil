import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import { Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "./app.css"
import UserProfilePage from "./UserProfilePage";
import Manage from "./managers/ManagerFacade";


function EventListClub() {
  
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [data, setData]= useState();
    const [activeItem, setActiveItem] = useState(0);
    const [show, setShow] = useState(false);
    const [currentEventJoined, setJoined] = useState(false)
    const [registeredEvents, setRegisteredEvent] = useState([])
    
    const [noOfRows, setNoOfRows] = useState(1);
    const history = useNavigate();

    const fetchEventData = async () => {
      var b = await Manage("event").getAllEvents()
      setData(b)
      setNoOfRows(b)
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

        } catch(err) {
            console.log(err);
            alert("Fetch error");
        }
    } 

    useEffect(async () => {
        if(loading) return;
        if (!user) return history("/");
        if(data) {
        } 
         
        await fetchEventData()
        await fetchUsername()
        
    }, [user]);

    if(data != null)
      console.log(data[0].getDescription())
    
      const handleClose = () => {
        setShow(false);
        setJoined(false)
      }
  const handleShow = (item) => {
        setActiveItem(item)
        
        //
        let eventId = (item + 1).toString()
        console.log('itenm', eventId)
        console.log('events', registeredEvents)
    
        registeredEvents.forEach((event) => {
          if(eventId == event) {
            
            setJoined(true)
          }
        })
        setShow(true);
      }
    
  if(data == null) {
    return <div>loading...</div>
  }

  return (
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
            <th scope="col"><center>Club</center></th>
            <th scope="col"><center>Date</center></th>
            <th scope="col"><center>Time Block</center></th>
            <th scope="col"><center>Details</center></th>
            
            
          </tr>
        </thead>
        <tbody>
        {data.map((elementInArray, index) => {
              console.log(elementInArray, index)
              return (
              
                <tr>
                <th scope="row">{index + 1}</th>
                <td><center>{data[index].getName()}</center></td>
                <td><center>{data[index].getClub()}</center></td>
                <td><center>{data[index].getDateRequested()}</center></td>
                <td><center>{data[index].getTimeRequested()}</center></td>
                <div>
                    <center>
                    <Button variant="primary" size="sm" onClick={() => handleShow(index)}>
                    Show More
                    </Button>
                    </center>
                </div>
                

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data[activeItem].getName()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popup-info-container">
            <div className="popup-info-holder">
            <div>Location:</div> <div>{data[activeItem].getLocation()}</div>
            </div>
            <div className="popup-info-holder">
            <div>Description:</div> <div>{data[activeItem].getDescription()} </div>
            </div>
            <div className="popup-info-holder">
            <div>Club:</div> <div>{data[activeItem].getClub()} </div>
            </div>
            <div className="popup-info-holder">
            <div>Duration:</div> <div>{data[activeItem].getDuration()} minutes </div>
            </div>
            <div className="popup-info-holder">
            <div>Available Quota:</div> <div>{data[activeItem].getQuota()} left </div>
            </div>
            <div className="popup-info-holder">
            <div>Time:</div> <div>{data[activeItem].getTimeRequested()}  </div>
            </div>
            <div className="popup-info-holder">
            <div>Date:</div> <div>{data[activeItem].getDateRequested()}  </div>
            </div>
          </div>
          </Modal.Body>
        <Modal.Footer>
         
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
export default EventListClub;
