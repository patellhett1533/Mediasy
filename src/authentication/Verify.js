import React, { useState } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";

const Verify = (props) => {
  let navigate = useNavigate();
  const [otp, setOtp] = useState(null);
  const [err, setErr] = useState(null);

  const handleOtpForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://mediasy-backend.onrender.com/api/verifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user: props.id, code: otp }),
      }
    );
    const json = await response.json();

    if (response.status == "200") {
      navigate("/login");
    } else {
      e.preventDefault();
      setErr(json.message);
    }
  };

  const resendOtp = async (e) => {
    console.log(props.id);
    e.preventDefault();
    const respo = await fetch(
      `https://mediasy-backend.onrender.com/api/resendOtp`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user: props.id }),
      }
    );
    const data = await respo.json();
    console.log(data);
  };

  const onchange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="login-data">
      <h2>Verify Your Email</h2>
      <form onSubmit={handleOtpForm}>
        <div className="input-field email">
          <label htmlFor="otp">OTP</label>
          <input type="text" name="otp" id="otp" onChange={onchange} />
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
  );
};

export default Verify;
