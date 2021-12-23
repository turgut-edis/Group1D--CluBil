import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";

function FirstPage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useNavigate();

    const fetchUsername = async () => {
        console.log(collection(db,"users"));
        try {
            const querySnapShot = await getDocs(collection(db, "users")); 
            const data = await querySnapShot.docs[0].data();
            setName(data.name);
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
    <h1>FirstPage</h1>
    <p>Logged in as {name}</p>
    <Button variant="primary" onClick={logout}>
          Logout
        </Button>
        </>
  );
}
export default FirstPage;