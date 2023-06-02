import React, { useEffect, useState, useRef } from "react";
import Save from "../default/Save";
import UserId from "../default/UserId";
import UserImg from "../default/UserImg";
import UserName from "../default/UserName";
import Comment from "./../default/Comment";
import Like from "./../default/Like";

const Post = () => {
  const [homePost, setHomePost] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [curr, setCurr] = useState(0);
  const [pid, setPid] = useState([]);

  const clickCommentModal = (e) => {
    setPid(e.target.id);
    setCommentModal(commentModal == true ? false : true);
  };

  useEffect(() => {}, [pid]);

  const prevBtn = (n) => {
    setCurr((curr) => (curr === 0 ? n - 1 : curr - 1));
  };

  const nextBtn = (n) => {
    setCurr((curr) => (curr === n - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    const getHomePost = async () => {
      const response = await fetch(
        "https://mediasy-backend.onrender.com/api/feed",
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      return json;
    };
    getHomePost().then((json) => setHomePost(json.posts));
  }, [homePost]);

  if (!homePost) return null;

  return (
    <div className="feed-post">
      {homePost.length == 0 && <p className="unavailable">No Post Available</p>}
      {homePost &&
        homePost.map((item) => {
          return (
            <div className="post-box">
              <div className="post-info">
                <div className="post-user">
                  <a href={`/profile/${item.createdBy}`}>
                    <UserImg id={item.createdBy} />
                  </a>
                  <div className="post-username">
                    <a href={`/profile/${item.createdBy}`}>
                      <UserName id={item.createdBy} />
                    </a>
                  </div>
                </div>
                <div className="post-option">
                  <i className="bx bx-dots-vertical-rounded"></i>
                </div>
              </div>
              <div className="post-img">
                <div className="img-slider">
                  {item.postPicture.map((item1, index) => {
                    return (
                      <div
                        className="img-box"
                        style={{
                          transform: `translateX(-${curr * 100}%)`,
                          left: `${index * 100}%`,
                        }}
                      >
                        <img
                          src={`https://mediasy-backend.onrender.com/images/${item1.img}`}
                          alt=""
                        />
                      </div>
                    );
                  })}

                  {item.postPicture.length > 1 && (
                    <div className="img-navigate">
                      <i
                        className="bx bx-chevron-left prev-btn"
                        onClick={() => prevBtn(item.postPicture.length)}
                      ></i>
                      <i
                        className="bx bx-chevron-right next-btn"
                        onClick={() => nextBtn(item.postPicture.length)}
                      ></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="post-disc">
                <div className="post-button">
                  <Like postId={item._id} like={item.like.length} />
                  <div className="button-action">
                    <i className="bx bx-share"></i>
                    <p>share</p>
                  </div>
                  <div className="button-action">
                    <i
                      className="bx bx-comment"
                      id={`${item._id}`}
                      onClick={clickCommentModal}
                    ></i>
                    <p>comment</p>
                  </div>
                  <Save postId={item._id} />
                </div>
                <div className="post-caption-area">
                  <p>
                    <UserId id={item.createdBy} />
                    &nbsp;{item.discription}
                  </p>
                </div>
                <div className="post-comment">
                  {pid !== null && (
                    <Comment
                      modal={clickCommentModal}
                      commentModal={commentModal}
                      postId={pid}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
