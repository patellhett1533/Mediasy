import React, { useEffect, useState } from "react";

const UserId = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/profile/${props.id}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      return json;
    };
    getUser().then((json) => setUser(json));
  }, []);

  if (!user) return null;
  return <span>@{user.username}</span>;
};

export default UserId;
