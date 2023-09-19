import axios from "axios";
import { useState } from "react";
import {
  PersonCircle,
  Heart,
  ArrowsAngleExpand,
  ChevronCompactDown,
  ChatLeftDots,
  ChatRightDots,
  HeartFill,
  CheckCircleFill,
  ExclamationCircleFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { postWithAuth, RefreshToken } from "../api/ApiCalls";

const PostForm = ({ refreshPosts, user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      userId: user.id,
    };
    try {
      if (title != "" && description != "") {
        const response = postWithAuth("/api/v1.0/posts", data);
        await refreshPosts();
        setTitle("");
        setDescription("");
        setIsSent(true);
      } else throw Error("You cant post it as empty");
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
          handleSubmit();
        } catch (error) {
          if ((error.response.statusText = "Unauthorized")) {
            setError(error);
            setIsSent(false);
            localStorage.removeItem("currentUser");
          }
        }
      }
    }
  };

  return (
    <div className="col-lg-12 mt-3 ">
      {" "}
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
      )}
      {isSent && (
        <div
          class="alert alert-success alert-dismissible d-flex align-items-center"
          role="alert"
        >
          <CheckCircleFill />{" "}
          <div className="mx-2"> Message sent successfully</div>
          <div
            class="btn btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></div>
        </div>
      )}
      <div className="card shadow border-none">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="What's the subject?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="How do you feel today?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="btn btn-success float-end" onClick={handleSubmit}>
            Post it
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default PostForm;
