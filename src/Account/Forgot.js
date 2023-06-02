import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../authentication/form.css";
import "./account.css";

const Forgot = () => {
  let navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [otp, setOtp] = useState(null);
  const [user, setUser] = useState(null);
  const [uname, setUname] = useState(null);
  const [err, setErr] = useState(null);
  const [pass, setPass] = useState(null);
  const [type, setType] = useState("password");
  const [form, setForm] = useState(false);
  const showTogle = () => {
    if (hide === true) {
      setType("password");
      setHide(false);
    } else {
      setType("text");
      setHide(true);
    }
  };

  const sendOtpToUser = async (e) => {
    e.preventDefault();
    if (uname !== null) {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/userId/${uname}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const json = await respo.json();

      if (json.message === "not") {
        setErr("User not found");
      } else {
        const uid = json.message[0]._id;
        console.log(uid);
        setUser(uid);
        console.log(user);
        const respo = await fetch(
          `https://mediasy-backend.onrender.com/api/resendOtp`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ user: json.message[0]._id }),
          }
        );
        const data = await respo.json();

        setErr(data.message);
      }
    } else {
      setErr("Username is Mandatory");
    }
  };

  const handleOtpForm = async (e) => {
    e.preventDefault();
    if (otp !== null) {
      const response = await fetch(
        `https://mediasy-backend.onrender.com/api/verifyOtp`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user, code: otp }),
        }
      );
      const json = await response.json();

      if (response.status == "200") {
        setForm(true);
      } else {
        console.log(json.message);
      }
    } else {
      setErr("Enter Otp First");
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    if (user) {
      const respo = await fetch(
        `https://mediasy-backend.onrender.com/api/resendOtp`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user: user }),
        }
      );
      const data = await respo.json();
      console.log(data);
    } else {
      console.log("empty username not allowed");
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://mediasy-backend.onrender.com/api/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user: user, password: pass }),
      }
    );
    const data = await res.json();

    if (res.status == "200") {
      navigate("/login");
    }
  };

  const onchange = (e) => {
    setOtp(e.target.value);
  };

  const onUname = (e) => {
    setUname(e.target.value);
  };

  const onPassword = (e) => {
    setPass(e.target.value);
  };

  return (
    <div>
      <div className="login form-section">
        <div className="form-area">
          <div className="login-form">
            {!form ? (
              <div className="login-data">
                <h2>Enter Your Username</h2>
                <form onSubmit={handleOtpForm}>
                  <div className="input-field email">
                    <label htmlFor="uname">Username</label>
                    <input
                      type="text"
                      name="uname"
                      id="uname"
                      onChange={onUname}
                    />
                    <span onClick={sendOtpToUser} className="sendOtpClass">
                      send otp
                    </span>
                  </div>
                  <div className="input-field email">
                    <label htmlFor="otp">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      onChange={onchange}
                    />
                  </div>
                  <div
                    className={
                      err == null
                        ? "input-button error-button error-show"
                        : "input-button error-button"
                    }
                  >
                    <input type="submit" value={err} disabled />
                  </div>
                  <div className="input-button login-button">
                    <input type="submit" name="submit" value={"Submit"} />
                  </div>
                  <div className="forgot-password">
                    <a onClick={resendOtp}>Resend Otp</a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="login-data">
                <h2>Welcome To Back</h2>
                <form onSubmit={handleForm}>
                  <div className="input-field password">
                    <label htmlFor="password">New Password</label>
                    <input
                      type={type}
                      name="password"
                      id="password"
                      placeholder="8 Character"
                      onChange={onPassword}
                    />
                    <i
                      className={hide === false ? "bx bx-show" : "bx bx-hide"}
                      onClick={showTogle}
                    ></i>
                  </div>
                  <div className="input-button login-button">
                    <input type="submit" name="Save" value={"Save"} />
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="login-img"></div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
