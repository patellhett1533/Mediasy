import React, { useEffect, useState } from "react";
import "./list.css";
import { useParams } from "react-router";
import UserImg from "../default/UserImg";
import UserName from "../default/UserName";
import UserId from "../default/UserId";
import FollowBtn from "../default/FollowBtn";

const Following = () => {
  const [users, setUsers] = useState(null);
  const user = useParams().id;

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/profile/${user}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      return json;
    };

    getUsers().then((json) => setUsers(json.following));
  }, [users]);

  if (!users) return null;

  return (
    <div className="user-list-section">
      <h3>Following</h3>
      <div className="user-list">
        {users.length == 0 ? (
          <p className="unavailable">No Following</p>
        ) : (
          users.map((item) => {
            return (
              <div className="user-list-box">
                <div className="user-list-info">
                  <a>
                    <UserImg id={item} />
                  </a>
                  <div className="user-list-username">
                    <p>
                      <UserName id={item} />
                    </p>
                    <span>
                      <UserId id={item} />
                    </span>
                  </div>
                </div>
                <div className="follow-button user-follow-btn">
                  <FollowBtn userId={item} />
                </div>
              </div>
            );
          })
        )}
        {!users && <h3 className="empty-list">No Users</h3>}
      </div>
    </div>
  );
};

export default Following;
