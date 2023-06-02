import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FollowBtn from "../default/FollowBtn";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [post, setPost] = useState(null);
  const user = useParams().id;

  useEffect(() => {
    const getProfile = async () => {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/profile/${user}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await respo.json();
      return json;
    };
    getProfile().then((json) => setProfile(json));

    const getProfilePost = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/userPost/${user}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const data = await response.json();
      return data;
    };
    getProfilePost().then((data) => setPost(data));
  }, [profile]);

  if (!profile) return null;

  return (
    <div className="profile-section">
      <div className="profile-info">
        <img
          src={`https://mediasy-backend.onrender.com/UserImages/${profile.profilePic}`}
          alt=""
        />
        <div className="profile-name">
          <p>
            {profile.firstname} {profile.lastname}
          </p>
          <span>@{profile.username}</span>
          <br />
          <span>{profile.bio}</span>
        </div>
      </div>
      <div className="follow-btn">
        <FollowBtn userId={user} />
      </div>
      <div className="profile-count">
        <div className="profile-follower count-box">
          <span>
            <Link to={`/follower/${user}`}>Follower</Link>
          </span>
          <p>
            <Link to={`/follower/${user}`}>{profile.follower.length}</Link>
          </p>
        </div>
        <div className="profile-post count-box">
          <span>Post</span>
          <p>
            {!post && "0"}
            {post && post.length}
          </p>
        </div>
        <div className="profile-following count-box">
          <span>
            <Link to={`/following/${user}`}>Following</Link>
          </span>
          <p>
            <Link to={`/following/${user}`}>{profile.following.length}</Link>
          </p>
        </div>
      </div>
      <div className="profile-content">
        {post &&
          post.map((item, i) => {
            let isMore = false;
            if (post[i].postPicture.length > 1) {
              isMore = true;
            }
            return (
              <div className="one-post">
                <a href={`/feed/${post[i]._id}`}>
                  <img
                    src={`https://mediasy-backend.onrender.com/images/${item.postPicture[0].img}`}
                    alt=""
                  />
                  <i className="bx bx-dock-right"></i>
                  {isMore && <i className="bx bx-dock-right"></i>}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserProfile;
