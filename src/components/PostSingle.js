import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWithAuth } from "../api/ApiCalls";
import Post from "./Post";

const PostSingle = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPost = async () => {
    try {
      const response = await getWithAuth(`/api/v1.0/posts/${postId}`);

      setIsLoaded(true);
      setPostData(response.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  const renderPost = () => {
    console.log(postData);
    return <Post data={postData} likeList={postData.likeList}></Post>;
  };
  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container mb-5">
        <div className="row">{renderPost()}</div>
      </div>
    );
  }
};

export default PostSingle;
