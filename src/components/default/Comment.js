import React, { useEffect, useState } from "react";
import UserId from "./UserId";
import "./comment.css";

const Comment = (props) => {
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const getComment = async () => {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/comment/${props.postId}`,
        {
          method: "GET",
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      const data = await response.json();
      return data;
    };

    getComment().then((data) => setComment(data));
  }, [comment, props.postId]);

  const submitComment = async () => {
    const respo = await fetch(
      `https://mediasy-backend.onrender.com/api/comment/${props.postId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: commentText }),
      }
    );
    const json = await respo.json();
    setCommentText("");
  };

  return (
    <div className="comment-box">
      <div
        className={
          props.commentModal == true
            ? "comment-modal"
            : "comment-modal none-modal"
        }
      >
        <div className="comment-area-box">
          <i className="close-comment bx bx-x" onClick={props.modal}></i>
          <div className="comment-post">
            <textarea
              placeholder="Comment Your Opinion"
              rows={1}
              name="commentText"
              onChange={(e) => setCommentText(e.target.value)}
              required
            ></textarea>
            <button type="submit" onClick={submitComment}>
              <i className="bx bxs-send"></i>
            </button>
          </div>
          <hr />
          <div className="comment-other">
            {!comment && <h3>No comments</h3>}
            {comment &&
              comment.map((comm) => {
                return (
                  <>
                    {
                      <p className="comment-line">
                        <UserId id={comm.user} />
                        &nbsp;{comm.text}
                      </p>
                    }
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
