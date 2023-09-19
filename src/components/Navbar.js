import React, { useEffect, useState } from "react";
import { Power } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  const history = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    history("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          PostyApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item px-3 mt-3 mt-sm-0 ">
              <Link
                to="/"
                aria-current="page"
                className="text-white text-decoration-none"
              >
                Home
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {user && user.id != null ? (
              <>
                <li className="nav-item px-3 mt-3 mt-sm-0">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-white text-decoration-none"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item px-3 mt-3 mt-sm-0">
                  <Link
                    className="text-white text-decoration-none"
                    onClick={logout}
                  >
                    <Power /> Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item px-3  mt-sm-0">
                  <Link to="/login" className="text-white text-decoration-none">
                    Login
                  </Link>
                </li>
                <li className="nav-item px-3 mt-3 mt-sm-0">
                  <Link
                    to="/register"
                    className="text-white text-decoration-none"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
