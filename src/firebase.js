import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBp_2C9q_k4nQ5SHNt3PIy8M6br98x0GbM",
    authDomain: "clubil-dev.firebaseapp.com",
    projectId: "clubil-dev",
    storageBucket: "clubil-dev.appspot.com",
    messagingSenderId: "307322682143",
    appId: "1:307322682143:web:146dcb5507fa83214c0e2a"
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