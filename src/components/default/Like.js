import React, { useState, useEffect } from "react";

const Like = (props) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    const likePost = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/isLike/${props.postId}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const data = await response.json();
      return data;
    };

    likePost().then((data) => setLike(data.message == "Liked" ? true : false));
  }, [like]);

  const onLike = async () => {
    const respo = await fetch(
      `https://mediasy-backend.onrender.com/api/like/${props.postId}`,
      {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const json = await respo.json();
    setLike(json.message == "Liked" ? true : false);
  };

  return (
    <div className="button-action">
      <i
        className={like == false ? "bx bx-heart" : "bx bxs-heart"}
        onClick={onLike}
      ></i>
      <p>{props.like}</p>
    </div>
  );
};

export default Like;
