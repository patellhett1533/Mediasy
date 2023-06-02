import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserId from "../default/UserId";
import UserImg from "../default/UserImg";
import UserName from "../default/UserName";
import "./feed.css";
import Comment from "./../default/Comment";
import Like from "./../default/Like";
import Save from "./../default/Save";
import { useNavigate } from "react-router-dom";

const ViewPost = () => {
  const navigate = useNavigate();
  const [commentModal, setCommentModal] = useState(false);
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [curr, setCurr] = useState(0);
  const [own, setOwn] = useState(null);
  const postId = useParams().id;

  const clickCommentModal = () => {
    setCommentModal(commentModal == true ? false : true);
  };

  const prevBtn = () => {
    setCurr((curr) =>
      curr === 0 ? posts.post.postPicture.length - 1 : curr - 1
    );
  };

  const nextBtn = () => {
    setCurr((curr) =>
      curr === posts.post.postPicture.length - 1 ? 0 : curr + 1
    );
  };

  useEffect(() => {
    const getPostById = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/feed/${postId}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json = await response.json();
      return json;
    };
    getPostById().then((json) => setPosts(json));
    // if(!posts) return;
    const getUser = async () => {
      const response1 = await fetch(
        `https://mediasy-backend.onrender.com/api/profile/${posts.post.createdBy}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const json1 = await response1.json();
      return json1;
    };
    getUser().then((json1) => setUser(json1));

    const checkPost = async () => {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/ownPost/${posts.post.createdBy}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const data = await respo.json();
      return data;
    };
    checkPost().then((data) => setOwn(data == "access" ? "self" : "other"));
  }, [posts]);

  const displayImg = (item, index) => {
    return (
      <div
        className="img-box"
        style={{
          transform: `translateX(-${curr * 100}%)`,
          left: `${index * 100}%`,
        }}
      >
        <img
          src={`https://mediasy-backend.onrender.com/images/${item.img}`}
          alt=""
        />
      </div>
    );
  };

  const deletePost = async () => {
    const res = await fetch(
      `https://mediasy-backend.onrender.com/api/deletePost/${postId}`,
      {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    const data1 = await res.json();

    if (res.status == "200") {
      navigate("/profile");
    }
  };

  if (!posts) return null;
  if (!user) return null;

  return (
    <div className="feed-section">
      <div className="feed-specific">
        <div className="feed-specific-post">
          <div className="post-box">
            <div className="post-info">
              <div className="post-user">
                <UserImg id={posts.post.createdBy} />
                <div className="post-username">
                  <UserName id={posts.post.createdBy} />
                </div>
              </div>
              <div className="post-option">
                {own == "self" && (
                  <i className="bx bxs-trash" onClick={deletePost}></i>
                )}
              </div>
            </div>
            <div className="post-img">
              <div className="img-slider">
                {posts.post.postPicture.map(displayImg)}

                {posts.post.postPicture.length > 1 && (
                  <div className="img-navigate">
                    <i
                      class="bx bx-chevron-left prev-btn"
                      onClick={prevBtn}
                    ></i>
                    <i
                      class="bx bx-chevron-right next-btn"
                      onClick={nextBtn}
                    ></i>
                  </div>
                )}
              </div>
            </div>
            <div className="post-disc">
              <div className="post-button">
                <Like postId={postId} like={posts.post.like.length} />
                <div className="button-action">
                  <i className="bx bx-share"></i>
                  <p>share</p>
                </div>
                <div className="button-action">
                  <i className="bx bx-comment" onClick={clickCommentModal}></i>
                  <p>comment</p>
                </div>
                <Save postId={postId} />
              </div>
              <div className="post-caption-area">
                <p>
                  <UserId id={posts.post.createdBy} />
                  &nbsp;{`${posts.post.discription}`}
                </p>
              </div>
              <div className="post-comment">
                <Comment
                  modal={clickCommentModal}
                  commentModal={commentModal}
                  postId={postId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
