import React, { useEffect, useState } from "react";
import "./save.css";

const Save = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getSavePost = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/get-save`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      console.log(json);
      return json;
    };
    getSavePost().then((json) => setPost(json));
  }, []);

  if (!post) return null;

  return (
    <div className="save-section">
      <h3>saved posts</h3>
      <div className="save-posts">
        {post.length == 0 ? (
          <p className="unavailable">No post save yet</p>
        ) : (
          post.map((item) => {
            let isMore = false;
            if (item.postPicture.length > 1) {
              isMore = true;
            }
            return (
              <div className="one-post">
                <a href={`/feed/${item._id}`}>
                  <img
                    src={`https://mediasy-backend.onrender.com/images/${item.postPicture[0].img}`}
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

export default Save;
