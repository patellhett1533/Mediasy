import React, { useContext, useEffect, useState } from "react";
import EditModal from "./EditModal";
import "./profile.css";
import { DarkModeContext } from "../../context/theme/themeContext";
import { Link } from "react-router-dom";

const getUser = async () => {
  const response = await fetch(
    "https://mediasy-backend.onrender.com/api/profile",
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const json = await response.json();
  return json;
};

const getPost = async () => {
  const response = await fetch(
    "https://mediasy-backend.onrender.com/api/userPost",
    {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    }
  );
  const json2 = await response.json();
  return json2;
};

const Profile = () => {
  const [menu, setMenu] = useState(false);
  const [member, setMember] = useState(null);
  const [post, setPost] = useState([]);
  const [modal, setModal] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const clickModal = () => {
    setModal(modal == false ? true : false);
  };

  const onShow = () => {
    setMenu(menu == false ? true : false);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const onDelete = async () => {
    const res = await fetch(
      "https://mediasy-backend.onrender.com/api/delete-acc",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const json = await res.json();
    if (json.message == "success") {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const onDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkmode", !darkMode);
  };

  useEffect(() => {
    getUser().then((json) => setMember(json));
    getPost().then((json2) => setPost(json2));
  }, []);

  if (!member) return null;

  return (
    <div className="profile-section">
      <div className="setting-section">
        <i className="bx bx-menu" onClick={onShow}></i>
        <div
          className={
            menu == true ? "setting-option showmenu" : "setting-option"
          }
        >
          <li>
            <Link to="/saved">Saved</Link>
          </li>
          <li onClick={onDarkMode}>Dark Mode</li>
          <li onClick={onLogout}>Logout</li>
          <li onClick={onDelete}>Delete Id</li>
        </div>
      </div>
      <div className="profile-info">
        <img
          src={`https://mediasy-backend.onrender.com/Userimages/${member.profilePic}`}
          alt=""
          onClick={clickModal}
        />
        <div className="edit">
          <i className="bx bx-plus"></i>
        </div>
        <div className="profile-name">
          <p>
            {member.firstname} {member.lastname}
          </p>
          <span>@{member.username}</span>
          <br />
          <span>{member.bio}</span>
        </div>
      </div>
      <EditModal
        close={clickModal}
        modal={modal}
        pic={member.profilePic}
        fname={member.firstname}
        lname={member.lastname}
        uname={member.username}
        bio={member.bio}
      />
      <div className="profile-count">
        <div className="profile-follower count-box">
          <span>
            <Link to={`/follower/${member._id}`}>Follower</Link>
          </span>
          <p>
            <Link to={`/follower/${member._id}`}>{member.follower.length}</Link>
          </p>
        </div>
        <div className="profile-post count-box">
          <span>Post</span>
          <p>{post.length}</p>
        </div>
        <div className="profile-following count-box">
          <span>
            <Link to={`/following/${member._id}`}>Following</Link>
          </span>
          <p>
            <Link to={`/following/${member._id}`}>
              {member.following.length}
            </Link>
          </p>
        </div>
      </div>
      <div className="profile-content">
        {post.length == 0 ? (
          <p className="unavailable">No Post</p>
        ) : (
          post.map((item, i) => {
            let isMore = false;
            if (post[i].postPicture.length > 1) {
              isMore = true;
            }
            return (
              <div className="one-post">
                <a href={`/feed/${post[i]._id}`}>
                  <img
                    key={i}
                    src={`https://mediasy-backend.onrender.com/images/${post[i].postPicture[0].img}`}
                    alt=""
                  />
                  {isMore && <i className="bx bx-dock-right"></i>}
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
