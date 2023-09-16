import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWithAuth, RefreshToken } from "../api/ApiCalls";
import Avatar from "./Avatar";
import UserActivity from "./UserActivity";

const User = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const userInLocal = JSON.parse(localStorage.getItem("currentUser"));
  const getUserData = async () => {
    try {
      const response = await getWithAuth(`/api/v1.0/users/${userId}`);
      setUserData(response.data);
      setIsLoaded(true);
    } catch (error) {
      
      if ((error.response.statusText = "Unauthorized")) {
        try {
          var responseRefresh = await RefreshToken();
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              ...userInLocal,
              token: responseRefresh.data.accessToken,
              refreshToken: responseRefresh.data.refreshToken,
            })
          );
          getUserData();
        } catch (error) {
          if ((error.response.statusText = "Unauthorized")) {
            setIsLoaded(true);
            setError(error);
            localStorage.removeItem("currentUser");
          }
        }
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            {" "}
            <Avatar user={userData} />
          </div>
          <div className="col-lg-9 col-sm-12">
            {" "}
            <UserActivity userId={userId} />
          </div>
        </div>
      </div>
    );
  }
};

export default User;
