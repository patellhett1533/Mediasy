import React, { useState, useEffect } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [hide, setHide] = useState(false);
  const [type, setType] = useState("password");
  const [err, setErr] = useState(null);
  const showTogle = () => {
    if (hide === true) {
      setType("password");
      setHide(false);
    } else {
      setType("text");
      setHide(true);
    }
  };

  // fetch node api to login data
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ username: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const { username, password } = credential;

    const response = await fetch(
      "https://mediasy-backend.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const json = await response.json();
    if (json.token) {
      localStorage.setItem("token", json.token);
      navigate("/");
    }

    if (json.message) {
      setErr(json.message);
    }
  };

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="login form-section">
        <div className="form-area">
          <div className="login-form">
            <div className="login-data">
              <h2>Welcome To Back</h2>
              <form onSubmit={handleForm}>
                <div className="input-field email">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="abc_123"
                    onChange={onchange}
                  />
                </div>
                <div className="input-field password">
                  <label htmlFor="password">Password</label>
                  <input
                    type={type}
                    name="password"
                    id="password"
                    placeholder="8 Character"
                    onChange={onchange}
                  />
                  <i
                    className={hide === false ? "bx bx-show" : "bx bx-hide"}
                    onClick={showTogle}
                  ></i>
                </div>
                <div className="forgot-password">
                  <Link to="/forgot-password">forgot password ?</Link>
                </div>
                <div
                  className={
                    err == null
                      ? "input-button error-button error-show"
                      : "input-button error-button"
                  }
                >
                  <input type="submit" name="login" value={err} disabled />
                </div>
                <div className="input-button login-button">
                  <input type="submit" name="login" value={"Login"} />
                </div>
              </form>
              <div className="already-login">
                <p>
                  Dont't have an account? <Link to="/signup">Signup</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="login-img"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
