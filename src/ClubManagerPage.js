import React, { Component, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { auth, db, logout } from "./firebase";
import "./app.css"

export default function ClubManagerPage () {
    return(
        <div className="display-5 clubs-title">Club manager page</div>
    );
}
