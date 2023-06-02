import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditModal = (props) => {
  let navigate = useNavigate();
  const [info, setInfo] = useState({
    fname: props.fname,
    lname: props.lname,
    username: props.uname,
    bio: props.bio,
  });
  const [err, setErr] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(
    `https://mediasy-backend.onrender.com/Userimages/${props.pic}`
  );

  const onchange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("firstname", info.fname);
    formdata.append("lastname", info.lname);
    formdata.append("username", info.username);
    formdata.append("bio", info.bio);

    if (photo) {
      formdata.append("profilePic", photo);
    }

    const response = await fetch(
      "https://mediasy-backend.onrender.com/api/editProfile",
      {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formdata,
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.error) {
      setErr(json.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={
        props.modal == false
          ? "edit-profile-modal  close-modal"
          : "edit-profile-modal"
      }
    >
      <form className="edit-profile-form" onSubmit={handleEditProfile}>
        <div className="edit-photo">
          <div
            className="edit-blur"
            onClick={() => document.querySelector(".imageUpload").click()}
          >
            <i class="bx bx-plus"></i>
          </div>
          <img
            src={photoUrl}
            alt=""
            onClick={() => document.querySelector(".imageUpload").click()}
          />
          <input
            type="file"
            accept="image/*"
            className="imageUpload"
            onChange={({ target: { files } }) => {
              if (files) {
                setPhotoUrl(URL.createObjectURL(files[0]));
                setPhoto(files[0]);
              }
            }}
          />
        </div>
        <div
          className={
            err && err !== null ? "edit-error" : "edit-error none-error"
          }
        >
          <input
            type="text"
            name="fullname"
            value={err}
            onChange={onchange}
            placeholder="Enter your full name"
            disabled
          />
        </div>
        <div className="edit-info">
          <div className="edit-name input-modal-group">
            <div className="edit-fname">
              <input
                type="text"
                name="fname"
                value={info.fname}
                onChange={onchange}
                placeholder="first name"
              />
            </div>
            <div className="edit-lname">
              <input
                type="text"
                name="lname"
                value={info.lname}
                onChange={onchange}
                placeholder="last name"
              />
            </div>
          </div>
          <div className="edit-username input-modal">
            <input
              type="text"
              name="username"
              value={info.username}
              onChange={onchange}
              placeholder="Create Username"
            />
          </div>
          <div className="edit-bio input-modal">
            <textarea
              name="bio"
              value={info.bio}
              onChange={onchange}
              placeholder="Type yourself"
            ></textarea>
          </div>
          <div className="edit-submit input-modal">
            <input type="submit" value="Save" className="save-btn" />
            <input
              type="button"
              className="closeBtn"
              value="Cancel"
              onClick={props.close}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
