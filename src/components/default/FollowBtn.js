import React, { useEffect, useState } from "react";
import "../profile/profile.css";

const FollowBtn = (props) => {
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    const checkFollow = async () => {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/checkFollow/${props.userId}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await respo.json();
      return json;
    };
    checkFollow().then((json) =>
      setFollow(json == "follow" ? "Follow" : "Followed")
    );
  }, []);

  const followUser = async () => {
    const response = await fetch(
      `https://mediasy-backend.onrender.com/api/follow/${props.userId}`,
      {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    return data;
  };

  const followProfile = () => {
    followUser().then((data) =>
      setFollow(data == "unfollowed" ? "Follow" : "Followed")
    );
  };

  if (!follow) return null;

  return (
    <button
      className={follow == "Follow" ? "followBtn" : "followedBtn"}
      onClick={followProfile}
    >
      {follow}
    </button>
  );
};

export default FollowBtn;
