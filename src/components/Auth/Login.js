import axios from "axios";
import React, { useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postWithoutAuth } from "../../api/ApiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation();
  const isRegistered = state?.isRegistered || false;

  const history = useNavigate();
  const signinRequestApi = async () => {
    try {
      const response = await postWithoutAuth("api/v1.0/auth", {
        username,
        password,
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          username,
          id: response.data.userId,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      window.location.reload();
    } catch (error) {
    }
  };

  const handleSignin = () => {
    signinRequestApi();
    history("/");
  };
  return (
    <div className="container col-4">
      <h1 className="mt-4 text-center">Login</h1>
      {isRegistered && (
        <div
          class="alert alert-success alert-dismissible d-flex align-items-center mt-4"
          role="alert"
        >
          <CheckCircleFill />{" "}
          <div className="mx-2">
            {" "}
            You registered successfully. You can sign in.
          </div>
          <div
            class="btn btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></div>
        </div>
      )}
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
          <div className="btn btn-teal float-end col-12" onClick={handleSignin}>
            Sign in
          </div>
        </div>{" "}
      </div>{" "}
      <div className="text-center">
        Are you not registered yet? <br />{" "}
        <Link to="/register">
          <div className="btn btn-primary">Sign Up</div>
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
