import React, { useState } from "react";
import "./post.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Post = () => {
  let navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const [filename, setFilename] = useState(null);
  const [file, setFile] = useState([]);
  const [disc, setDisc] = useState("");

  const addToPost = async (e) => {
    e.preventDefault();
    file.push(img);
    setImgUrl(null);
    setImg(null);
    setFilename(null);
  };

  const deselectImg = (filename) => {
    setFile(file.filter((files) => files.name != filename));
  };

  const handlePost = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("discription", disc);
    for (let index = 0; index < file.length; index++) {
      const temp = file[index];
      formdata.append("postPicture", temp);
    }

    const response = await fetch(
      "https://mediasy-backend.onrender.com/api/addPost",
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formdata,
      }
    );
    const json = await response.json();
    console.log(json);
    navigate("/");
  };

  const onchange = (e) => {
    setDisc(e.target.value);
  };

  return (
    <>
      <div className="addPost-section">
        <h3>Upload Photos to Make a Post</h3>
        <form onSubmit={handlePost}>
          <div
            className="select-photo"
            onClick={() => document.querySelector(".file-input").click()}
          >
            <input
              type="file"
              accept="image/*"
              className="file-input"
              hidden
              onChange={({ target: { files } }) => {
                files[0] && setFilename(files[0].name);
                if (files) {
                  setImgUrl(URL.createObjectURL(files[0]));
                  setImg(files[0]);
                }
              }}
            />

            {imgUrl ? (
              <img src={imgUrl} alt={filename} className="selected-img" />
            ) : (
              <div className="no-select">
                <i className="bx bxs-cloud-upload"></i>
                <p>Browse Photos to Upload</p>
              </div>
            )}
          </div>
          <div className="save-photo">
            <button onClick={addToPost}>ADD</button>
          </div>
          <div className="preview-photos">
            {file.map((file) => (
              <div className="selected-photo">
                <div>
                  <i className="bx bxs-file-image"></i>
                  <p>{file.name}</p>
                </div>
                <i
                  className="bx bxs-trash deleteImg"
                  onClick={() => deselectImg(file.name)}
                ></i>
              </div>
            ))}
          </div>
          <div className="post-caption">
            <label>Caption</label>
            <input
              type="text"
              placeholder="Type Something"
              onChange={onchange}
              required
            />
          </div>
          <div className="upload-photos">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;

{
  /* <i className='bx bxs-cloud-upload'></i>
          <p>Browse Photos to Upload</p> */
}
