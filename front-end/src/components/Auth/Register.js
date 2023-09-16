import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postWithoutAuth } from "../../api/ApiCalls";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await postWithoutAuth("api/v1.0/auth/register", {
        username,
        password,
      });
    } catch (error) {
    console.log("🚀 ~ file: Register.js:17 ~ handleSignup ~ error:", error)
    }
  };
  return (
    <div className="container col-4">
      <h1 className="mt-3 text-center">Register</h1>
      <div className="card mt-5">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label" for="inputUsername">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" for="inputPassword">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn btn-teal float-end col-12" onClick={handleSignup}>
            Sign Up
          </div>
        </div>{" "}
      </div>{" "}
      <div className="text-center">
        Are you already registered? <br />{" "}
        <Link to="/login">
          <div className="btn btn-primary">Sign in</div>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Register;
