import React, { useEffect, useState } from "react";
import "./mobileSearch.css";

const MobileSearch = () => {
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
    <div className="search-area-explor">
      <div className="search-section-explor">
        <i className="bx bx-search"></i>
        <input
          type="text"
          name="key"
          placeholder="Search"
          onChange={(e) => setKey(e.target.value)}
          className="search-bar-explor"
        />
      </div>
      <div
        className={
          key ? "search-result-explor" : "search-result-explor not-result"
        }
      >
        {!searchUser && <h3>No user found</h3>}
        {searchUser &&
          searchUser.map((data) => {
            return (
              <div className="suggest-box-explor">
                <div className="suggest-user-explor">
                  <a href={`/profile/${data._id}`}>
                    <img
                      src={`https://mediasy-backend.onrender.com/UserImages/${data.profilePic}`}
                      alt=""
                    />
                  </a>
                  <div className="suggest-username-explor">
                    <a href={`/profile/${data._id}`}>
                      {data.firstname} {data.lastname}
                    </a>
                    <span>@{data.username}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MobileSearch;
