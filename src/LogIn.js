import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import img2 from "./INGlogo-e1460465121276.jpg"
import { reject } from "async";
import Password from "antd/lib/input/Password";
import app from "./app.css"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = () => {
    if (username === "" || password === "") return;

    var bodyFromData = new FormData();
    bodyFromData.append("username", username);
    bodyFromData.append("password", password);
  };

  return (
    <div class="login-wrap-2" style={{paddingTop:"60px"}}>
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
              <h3 style={{ color: "#0A1551", marginTop: "40px" }}>Student Club Manager System</h3>
            </p>

            <div class="group">
              <label for="user" class="label">
                Username
              </label>
              <input
                id="user"
                type="text"
                class="input"
                required
                onChange={(e) => setUsername(e.target.value)}
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
              <label for="check" style={{ color: "#0A1551", display:"flex" }}>
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
                onClick={() => sendLoginRequest()}
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

