import React from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Comment = (props) => {
    const {description,userId,username}=props.data
    return (
      <div className="comment border-top mt-1 p-2 pt-3 px-3 ">
        {" "}
        <span style={{ color: "#34495e" }}>
          {" "}
          <Link
            to={`/users/${userId}`}
            className={"text-decoration-none"}
            style={{ color: "#2c3e50" }}
          >
            {" "}
            <PersonCircle /> {username}
          </Link>
        </span>

        <div className="commentDescription mt-2">{description}</div>
      </div>
    );
};

export default Comment;