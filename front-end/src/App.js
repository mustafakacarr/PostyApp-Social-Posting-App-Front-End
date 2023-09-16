import logo from "./logo.svg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useEffect, useState } from "react";
import PostSingle from "./components/PostSingle";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <div className="App ">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/users/:userId" element={<User />} exact />
          <Route
            path="/login"
            element={
              currentUser && currentUser.id ? <Navigate to="/" /> : <Login />
            }
          ></Route>
          <Route
            path="/register"
            element={
              currentUser && currentUser.id ? <Navigate to="/" /> : <Register />
            }
          ></Route>
          <Route
            path="/single-post/:postId"
            element={
              !currentUser || !currentUser.id ? (
                <Navigate to="/" />
              ) : (
                <PostSingle />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
