import axios from "axios";
import React, { useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { postWithoutAuth } from "../../api/ApiCalls";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const history = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await postWithoutAuth("api/v1.0/auth/register", {
        username,
        password,
      });
      history("/login", { state: { isRegistered: true } });
    } catch (error) {}
  };
  return (
    <div className="container col-4 ">
      <h1 className="mt-5 text-center">Register</h1>
      <div className="card mt-3">
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
      <div className="text-center mt-3">
        Are you already registered? <br />{" "}
        <Link to="/login">
          <div className="btn btn-primary mt-2">Sign in</div>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Register;
