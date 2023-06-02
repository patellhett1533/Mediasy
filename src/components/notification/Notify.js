import React, { useEffect, useState } from "react";
import "./notify.css";
import UserId from "../default/UserId";
import UserImg from "../default/UserImg";

const Notify = () => {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const getNotify = async () => {
      const response = await fetch(
        "https://mediasy-backend.onrender.com/api/notify",
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      return json;
    };
    getNotify().then((json) => setNotify(json));
  }, [notify]);

  if (!notify) return null;
  return (
    <div className="notify-section">
      <p className="notify-title">Notifications</p>
      <div className="notify-box">
        {notify.map((item) => {
          return (
            <div className="notify-field">
              {item.role == "images" ? (
                <a>
                  <img
                    src={`https://mediasy-backend.onrender.com/images/${item.img}`}
                    alt=""
                    className="postCover"
                  />
                </a>
              ) : (
                <a className="profilePic">
                  <UserImg id={item.self} />
                </a>
              )}
              <div className="notify-username">
                <a>
                  <UserId id={item.self} />
                </a>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notify;
