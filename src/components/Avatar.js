import axios from "axios";
import React, { useState } from "react";
import { CheckCircleFill, ExclamationCircleFill } from "react-bootstrap-icons";
import { putWithAuth, RefreshToken } from "../api/ApiCalls";

function Avatar(props) {
  const { user } = props;
  const [selected, setSelected] = useState(user.avatarId);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  let avatarList = [
    { id: 0, path: "0.png" },
    { id: 1, path: "1.png" },
    { id: 2, path: "2.png" },
    { id: 3, path: "3.png" },
  ];

  const onChangeHandler = (avatarId) => {
    setSelected(avatarId);
    putUserData(avatarId);
  };

  const putUserData = async (avatarId) => {
    try {
      const response = await putWithAuth(`/api/v1.0/users/${user.id}`, { avatarId });
      setSuccess(true);
    } catch (error) {
     if ((error.response.statusText = "Unauthorized")) {
       try {
         var responseRefresh = await RefreshToken();
         localStorage.setItem(
           "currentUser",
           JSON.stringify({
             ...user,
             token: responseRefresh.data.accessToken,
             refreshToken: responseRefresh.data.refreshToken,
           })
         );
         putUserData(avatarId);
       } catch (error) {
         if ((error.response.statusText = "Unauthorized")) {
           setError(error);
           localStorage.removeItem("currentUser");
         }
       }
     }
    }
  };

  return (
    <div>
      {error && (
        <div
          className="alert alert-danger alert-dismissible d-flex align-items-center"
          role="alert"
        >
          <ExclamationCircleFill /> <div className="mx-2"> {error.message}</div>
          <div
            className="btn btn-close"
            data-dismiss="alert"
            aria-label="Close"
          ></div>
        </div>
      )}
      {success && (
        <div
          className="alert alert-success alert-dismissible d-flex align-items-center"
          role="alert"
        >
          <CheckCircleFill />{" "}
          <div className="mx-2"> Avatar changed successfully</div>
          <div
            className="btn btn-close"
            data-dismiss="alert"
            aria-label="Close"
          ></div>
        </div>
      )}
      <div className="card justify-content-center text-center">
        <img
          src={`/avatars/${selected}.png`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          {user.id == JSON.parse(localStorage.getItem("currentUser")).id && (<a
            className="btn btn-primary col-12"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
          >
            Change avatar
          </a>)}
        </div>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
         
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Change Your Avatar
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
        
          <div className="offcanvas-body">
            <div>You can choose a new avatar for your profile</div>
            <div className="col-12 mt-3">
              {avatarList.map((avatar) => (
                <label className="avatar-label col-6" key={avatar.id}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="avatar"
                    id={avatar.id}
                    checked={selected == avatar.id}
                    onChange={() => onChangeHandler(avatar.id)}
                  />
                  <div className="avatar-preview">
                    <img
                      className="img-fluid"
                      width={120}
                      height={120}
                      src={"/avatars/" + avatar.path}
                      alt={"Avatar " + avatar.id}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Avatar;
