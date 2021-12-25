import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"

export default function AdminPage () {
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
      if (!user) return history("/", { replace: true });
    }, [user]);

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
                  <a class="nav-link" href="/manageEvents">
                    Manage Events
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageClubs">
                    Manage Clubs
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/manageProfiles">
                    Manage Profiles
                  </a>
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
        <div>You're logged in as {role} </div>
        <div>Your name is {name}</div>
        <div>You're in Admin Page</div>
      </div>
    );
  }
