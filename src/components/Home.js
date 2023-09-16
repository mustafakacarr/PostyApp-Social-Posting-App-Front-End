
import Post from './Post';
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostForm from './PostForm';
import { getWithoutAuth } from '../api/ApiCalls';

const Home = () => {
     const [error, setError] = useState(null);
     const [isLoaded, setIsLoaded] = useState(false);
     const [postList, setPostList] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const fetchData = async () => {
    try {
      const response = await getWithoutAuth("/api/v1.0/posts");
      setIsLoaded(true);
      setPostList(response.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

     useEffect(() => {
       fetchData();
     }, []);
     if (error) {
       return <div>{error.message}</div>;
     } else if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
       return (
         <div className="container mb-5">
           <div className="row">
      {user ?       <PostForm
               refreshPosts={()=>fetchData()}
               user={user}
             ></PostForm> : ""}
             {postList && postList.map((post) => (
               <Post data={post}></Post>
             ))}
           </div>
         </div>
       );
     }
};

export default Home;