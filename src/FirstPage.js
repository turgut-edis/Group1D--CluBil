import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"
//ToDo::
//Ergun

function FirstPage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
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
            setData(data)

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

<nav class="navbar navbar-expand-lg navbar-light bg-light">
 
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
          <a class="nav-link" href="#">Event List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Clubs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Finance</a>
        </li>
      </ul>

    </div>
    

   
    <div class="d-flex align-items-center">
        <p class="navbar-text">{name}</p>
        <img
          src="https://www.nicepng.com/png/detail/137-1379898_anonymous-headshot-icon-user-png.png"
          class="rounded-circle"
          height="35"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />
        <button type="button" class="btn btn-primary" onClick={logout}>Logout</button>
        
      
    </div>
    
  </div>
</nav>
    <div>You're logged in as {role} </div>
    <div>Your name is {name}</div>
        
        </>
  );
}
export default FirstPage;