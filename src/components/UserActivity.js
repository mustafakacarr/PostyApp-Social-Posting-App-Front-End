import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWithAuth } from "../api/ApiCalls";
import ActivityTable from "./ActivityTable";

const UserActivity = (props) => {
  const { userId } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getWithAuth(`/api/v1.0/users/activity/${userId}`);
      setIsLoaded(true);
      setActivityList(response.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  };

const data =
  activityList.length > 0 &&
  activityList.map((activity, i) => {
    return {
      id: i + 1,
      title: (
        <Link
          to={`/single-post/${activity[1]}`}
          className="text-decoration-none text-dark"
        >{`${activity[3]} ${activity[0]} on your post`}</Link>
      ),
    };
  });

  useEffect(() => {
    if (userId == JSON.parse(localStorage.getItem("currentUser")).id)
     { fetchData();}
  }, []);
  if (!isLoaded) return <div>Loading...</div>;
  else if (error) return <div>Error...</div>;
  else
    return (
      <div>
        {userId == JSON.parse(localStorage.getItem("currentUser")).id && (
          <div>
            <h3 className="text-center"> Last Activities</h3>
            {activityList.length > 0 ? (
              <ActivityTable data={data}></ActivityTable>
            ) : (
              <div className="mt-3 text-center">
                {" "}
                We couldnt find any activity yet about you
              </div>
            )}{" "}
          </div>
        )}
      </div>
    );
};

export default UserActivity;
