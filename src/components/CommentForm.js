import axios from "axios";
import React, { useState } from "react";
import {
  ExclamationCircleFill,
  PersonCircle,
  SendFill,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { postWithAuth, RefreshToken, refreshToken } from "../api/ApiCalls";

const CommentForm = (props) => {
  const { postId, refreshComments, user } = props;
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const history = useNavigate();
  const handleSubmitComment = async () => {
    const data = {
      postId,
      description,
      userId: user.id,
    };
    try {
      if (description != "") {
        const response = await postWithAuth("/api/v1.0/comments", data);
        refreshComments();
        setDescription("");
      } else throw Error("You cant comment it as empty");
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
            handleSubmitComment();
              

        } catch (error) {
          if ((error.response.statusText = "Unauthorized")) {
            setError(error);
            localStorage.removeItem("currentUser");
            history("/login");
            
          } 
        }
      }
     
    }
  };

  return (
    <div className="comment  mt-1 p-2 pt-3">
      {error && (
        <div
          class="alert alert-danger alert-dismissible d-flex align-items-center"
          role="alert"
        >
          <ExclamationCircleFill /> <div className="mx-2"> {error.message}</div>
          <div
            class="btn btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></div>
        </div>
      )}{" "}
      <div style={{ display: "flex", alignItems: "center" }}>
        <PersonCircle size={24} />
        <div className="input-group flex-nowrap px-2" style={{ flex: 1 }}>
          <textarea
            className="form-control"
            placeholder="Add a comment"
            aria-label="Add a comment"
            aria-describedby="addon-wrapping"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div
          className="btn btn-success input-group-text"
          onClick={handleSubmitComment}
        >
          Reply it <SendFill size={15} />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
