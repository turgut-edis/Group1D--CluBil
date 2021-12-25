import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBJRzOytrNrhQtJE0QcIJTIOKNHBwcn0yE",
  authDomain: "clubil-v3.firebaseapp.com",
  projectId: "clubil-v3",
  storageBucket: "clubil-v3.appspot.com",
  messagingSenderId: "201811472543",
  appId: "1:201811472543:web:b0f844ac9a3dd7e1d3b2aa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const regWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(db)
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signWithEmailAndPassword,
    regWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};