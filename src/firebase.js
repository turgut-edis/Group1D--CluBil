import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBTPywpG_cMKxQEi5rgEVpg6lx4GIydm98",
  authDomain: "clubil-v2.firebaseapp.com",
  projectId: "clubil-v2",
  storageBucket: "clubil-v2.appspot.com",
  messagingSenderId: "122129194201",
  appId: "1:122129194201:web:16fe0ad326a2404a8e72c8"
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