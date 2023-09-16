import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postWithoutAuth } from "../../api/ApiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <h1 className="mt-3 text-center">Login</h1>
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
