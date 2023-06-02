import React, { useEffect, useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import Verify from "./Verify";

const Signup = () => {
  // hide and show password
  const [hide, setHide] = useState(false);
  const [type, setType] = useState("password");
  const [otpForm, setOtpForm] = useState(false);
  const [uid, setUid] = useState(null);
  const showTogle = () => {
    if (hide === true) {
      setType("password");
      setHide(false);
    } else {
      setType("text");
      setHide(true);
    }
  };

  // fetch node api to signup data
  let navigate = useNavigate();
  const [credential, setCredential] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const { fname, lname, username, email, password } = credential;

    const response = await fetch(
      "https://mediasy-backend.onrender.com/api/signup",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstname: fname,
          lastname: lname,
          email,
          password,
          username,
        }),
      }
    );
    const json = await response.json();
    if (response.status == "202") {
      setUid(json.id);
      setOtpForm(true);
    }
  };

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="signup form-section">
        <div className="form-area">
          <div className="signup-form">
            {!otpForm ? (
              <div className="signup-data">
                <h2>Welcome To Strive</h2>
                <form onSubmit={handleForm}>
                  <div className="input-field-group name">
                    <div className="input-field-beta">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Jack"
                        onChange={onchange}
                        required
                      />
                    </div>
                    <div className="input-field-beta">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        placeholder="Lee"
                        onChange={onchange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-field email">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="abc_123"
                      onChange={onchange}
                      required
                    />
                  </div>
                  <div className="input-field email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="abc@xyz.com"
                      onChange={onchange}
                      required
                    />
                  </div>
                  <div className="input-field password">
                    <label htmlFor="password">Create Password</label>
                    <input
                      type={type}
                      name="password"
                      id="password"
                      placeholder="8 Character"
                      onChange={onchange}
                      required
                    />
                    <i
                      className={hide === false ? "bx bx-show" : "bx bx-hide"}
                      onClick={showTogle}
                    ></i>
                  </div>
                  <div className="input-button signup-button">
                    <input type="submit" name="signup" value={"Signup"} />
                  </div>
                </form>
                <div className="already-signup">
                  <p>
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            ) : (
              <Verify id={uid} />
            )}
          </div>
          <div className="signup-img"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
