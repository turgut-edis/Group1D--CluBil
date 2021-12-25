import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"
//ToDo::
//Taha

function UserProfilePage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [joinedClubs, setJoinedClubs] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData]= useState();
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
            setJoinedClubs(data.joinedClubs);
            setEmail(user.email);
            setData(data);

        } catch(err) {
            console.log(err);
            alert("Fetch error");
        }
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return history("/", {replace: true});
        fetchUsername();
    }, [user, loading]);
    

  return (
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
          src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
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
    <div class="d-flex align-items-center profilepic">
          <img
          src="https://png.pngitem.com/pimgs/s/238-2388363_comment-from-static-noise-profile-picture-vector-hd.png"
          class="rounded-circle"
          max width="200"
          max height="200"
          alt="Black and White Portrait of a Man"
          loading="lazy"
          />
          
          <div class="profileinfo-css"><strong>Full Name:</strong> {name} <br />
                                     <strong>Mail:</strong> {email} <br />
                                     <strong>Joined Clubs:</strong> {(joinedClubs + "")} <br />
                                     <strong>Role:</strong> {role} <br /></div>
    </div>

    <div class="nametext"> <strong>{name}</strong> </div>
      
<br />
    <button type="button" class="btn btn-primary changepassw nametext" onClick={logout}>Change Password</button>

<br />
    <button type="button" class="btn btn-primary editprofile nametext" onClick={logout}>Edit Profile</button>
        </>
  );
}
export default UserProfilePage;