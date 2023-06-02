import React, { useEffect, useState } from "react";
import "./pannel.css";
import dp from "../../asstes/img.jpg";
import userImg from "../../asstes/images.jpeg";

const Pannel = () => {
  const [key, setKey] = useState(null);
  const [searchUser, setSearchUser] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/explore/${key}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const result = await response.json();
      return result;
    };

    getSearchResult().then((result) => setSearchUser(result));
  }, [key]);

  return (
    <div className="sidepanel-section">
      <div className="account-option">
        <div className="search-section">
          <i className="bx bx-search"></i>
          <input
            type="text"
            name="key"
            placeholder="Search"
            onChange={(e) => setKey(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className={key ? "search-result" : "search-result not-result"}>
          {searchUser &&
            searchUser.map((item) => {
              return (
                <div className="suggest-box">
                  <div className="suggest-user">
                    <a href={`/profile/${item._id}`}>
                      <img
                        src={`https://mediasy-backend.onrender.com/UserImages/${item.profilePic}`}
                        alt=""
                      />
                    </a>
                    <div className="suggest-username">
                      <a href={`/profile/${item._id}`}>
                        {item.firstname} {item.lastname}
                      </a>
                      <span>@{item.username}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          {!searchUser && <h3>No user found</h3>}
        </div>
        <div className="notification-section">
          <div className="active-notification"></div>
          <i className="bx bx-bell"></i>
        </div>
      </div>
      <div className="people-suggest">
        <div className="suggest-title">
          <p>Suggestion</p>
        </div>
        <div className="suggest-list">
          <div className="suggest-box">
            <div className="suggest-user">
              <a>
                <img src={dp} alt="" />
              </a>
              <div className="suggest-username">
                <a>Kinely Jorder</a>
                <span>@_kinelyy</span>
              </div>
            </div>
            <div className="suggest-button">
              <button className="follow-button-suggest">Follow</button>
            </div>
          </div>
          <div className="suggest-box">
            <div className="suggest-user">
              <a>
                <img src={userImg} alt="" />
              </a>
              <div className="suggest-username">
                <a>Martin Lay</a>
                <span>@iMartin</span>
              </div>
            </div>
            <div className="suggest-button followed">
              <button className="follow-button-suggest">Followed</button>
            </div>
          </div>
          <div className="suggest-box">
            <div className="suggest-user">
              <a>
                <img src={dp} alt="" />
              </a>
              <div className="suggest-username">
                <a>Kinely Jorder</a>
                <span>@_kinelyy</span>
              </div>
            </div>
            <div className="suggest-button">
              <button className="follow-button-suggest">Follow</button>
            </div>
          </div>
        </div>
      </div>
      <div className="latest-activity"></div>
    </div>
  );
};

export default Pannel;
