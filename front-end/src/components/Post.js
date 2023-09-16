import axios from "axios";
import { useEffect, useState } from "react";
import {
  PersonCircle,
  Heart,
  ArrowsAngleExpand,
  ChevronCompactDown,
  ChatLeftDots,
  ChatRightDots,
  HeartFill,
  ChatSquareTextFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { deleteWithAuth, getWithoutAuth, postWithAuth, RefreshToken } from "../api/ApiCalls";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = (props) => {
  const { title, description, userId, id, username, likeList } = props.data;
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likeList.length);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likeId, setLikeId] = useState(null);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleCommentButton = () => {
    setShowComments(!showComments);
    fetchComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const deleteLike = async () => {
    try {
      const response = await deleteWithAuth(`/api/v1.0/likes/${likeId}`);
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
          saveLike();
        } catch (error) {
          if ((error.response.statusText = "Unauthorized")) {
            setError(error);
            localStorage.removeItem("currentUser");
          }
        }
      }
    }
  };

  const saveLike = async () => {
    const data = {
      postId: id,
      userId: user.id,
    };
    try {
      const response = postWithAuth("/api/v1.0/likes", data);
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
          saveLike();
        } catch (error) {
          if ((error.response.statusText = "Unauthorized")) {
            setError(error);
            localStorage.removeItem("currentUser");
          }
        }
      }
    }
  };
  useEffect(() => {
    if (user) {
      checkIsLiked();
    }
  }, []);

  const checkIsLiked = () => {
    var likeControl = likeList.find((like) => like.userId === user.id);
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getWithoutAuth("/api/v1.0/comments", {
        params: { postId: id },
      });
      setIsLoaded(true);
      setCommentList(response.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

  return (
    <div className="col-lg-12 mt-3">
      <div className="card shadow border-none">
        <div className="card-header">
          <div>
            {" "}
            <Link
              to={`/users/${userId}`}
              className={"text-decoration-none"}
              style={{ color: "#2c3e50" }}
            >
              {" "}
              <PersonCircle size={20} /> {username}
            </Link>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="likeSide d-flex align-items-center">
              <div style={{ cursor: user && "pointer" }}>
                {isLiked ? (
                  <HeartFill
                    size={22}
                    color="#e74c3c"
                    onClick={user && handleLike}
                  />
                ) : (
                  <Heart size={22} onClick={user && handleLike} />
                )}
              </div>{" "}
              <label className="mx-2" style={{ fontSize: "20px" }}>
                {likeCount}
              </label>
            </div>
            <div style={{ cursor: "pointer" }}>
              {" "}
              <ChatSquareTextFill size={22} onClick={handleCommentButton} />
            </div>
          </div>{" "}
          {showComments && (
            <div className="mt-2">
              {!commentList.length < 1 ? (
                commentList.map((comment) => <Comment data={comment}></Comment>)
              ) : (
                <div className="comment border-top mt-1 p-2 pt-3 px-3 ">
                  There is no comment yet
                </div>
              )}
              {user ? (
                <CommentForm
                  postId={id}
                  user={user}
                  refreshComments={fetchComments}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Post;
