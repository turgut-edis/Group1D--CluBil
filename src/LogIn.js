import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img2 from "./INGlogo-e1460465121276.jpg";
import {
  auth,
  signWithEmailAndPassword,
  db
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./app.css";
import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useNavigate();

  const fetchUsername = async () => {
    try {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setType(docSnap.data().type);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
    }
        catch(err) {
        console.log(err);
        alert("Fetch error");
    }
  }

  useEffect(  () => {
    if (loading) {
      //Loading Screen
      return;
    }
    
    if (user) {
       fetchUsername()
       console.log("type.." ,type)

        if(type == "Student") 
        {
          history("/contact", { replace: true });
        }
        else {
          history("/first", { replace: true });
        } 
      
    }
  }, [loading, user, history, type]);

  return (
    <div class="login-wrap-2" >
      <div class="login-wrap">
        <div class="login-html">
          <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
          <label for="tab-1" class="tab"></label>
          <input id="tab-2" type="radio" name="tab" class="sign-up" />
          <label for="tab-2" class="tab" display="none"></label>
          <div class="login-form">
            <div class="sign-in-htm">
              <img src={img2} width="300" height="70" className="im" />
              <p style={{ marginBottom: "0" }}>
                <div style={{ color: "#0A1551", marginTop: "40px", fontSize: "20px", textAlign: "center" }}>
                  Club Management System
                </div>
              </p>

              <div class="group">
                <label for="user" class="label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  class="input"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="group">
                <label for="pass" class="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  class="input"
                  required
                  data-type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="group">
                <input
                  id="check"
                  type="checkbox"
                  class="check"
                  valuPropName="checked"
                />
                <label
                  for="check"
                  style={{ color: "#0A1551", display: "flex" }}
                >
                  <span
                    class="icon"
                    style={{
                      backgroundColor: "rgba(128, 128, 128, 0.24)",
                      color: "#0A1551",
                    }}
                  ></span>{" "}
                  Remember Me{" "}
                </label>
              </div>
              <div class="group">
                <input
                  type="submit"
                  class="button"
                  value="Sign In"
                  onClick={() => signWithEmailAndPassword(email, password)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
