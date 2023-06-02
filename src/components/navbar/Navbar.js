import React, { useEffect, useState } from "react";
import dp from "../../asstes/profile.jpg";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    getUser().then((json) => setUser(json));
  }, []);

  if (!user) return null;

  return (
    <div className="navbar-section">
      <div className="website-logo">
        <h3>medeX</h3>
      </div>
      <div className="menubar section">
        <b>Menu</b>
        <ul className="menu-list">
          <li>
            <Link to="/" className="active">
              <i className="bx bx-home-alt"></i>
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/user-chat">
              <i className="bx bx-message-square-dots"></i>
              <p>Message</p>
            </Link>
          </li>
          <li>
            <Link to="/post">
              <i className="bx bx-plus"></i>
              <p>Post</p>
            </Link>
          </li>
          <li>
            <Link to="/notification">
              <i className="bx bx-bell"></i>
              <p>Notification</p>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="bx bx-user"></i>
              <p>Profile</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="account section">
        <div className="account-detail">
          <b>Account</b>
          <div className="user-info">
            <img
              src={`https://mediasy-backend.onrender.com/UserImages/${user.profilePic}`}
              alt=""
            />
            <div className="username-info">
              <p>
                {user.firstname} {user.lastname}
              </p>
              <span>@{user.username}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
