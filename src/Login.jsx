import React, { useState } from "react";
import "./Login.css";

const USERNAME = "admin";
const PASSWORD = "admin@123";

const usernameRegEx = /^[a-zA-Z0-9]+$/;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsinvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      setIsInvalidLogin(false);
      window.location.href = "/dashboard";
    } else {
      setIsInvalidLogin(true);
    }
  };

  const onUsernameChanged = (value) => {
    setUsername(value);
    if (value && value.match(usernameRegEx)) {
      setIsinvalidUsername(false);
    } else if (value) {
      setIsinvalidUsername(true);
    }
  };

  const onPassowrdChanged = (value) => {
    setPassword(value);
  };

  return (
    
    <div className="login-page">
      <div id="bg"></div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
      
          <div className="form-field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => onUsernameChanged(e?.target?.value)}
            />
            {isInvalidUsername && (
              <div className="error-message">
                {" "}
                Username should contain alphanumerics only{" "}
              </div>
            )}
          </div>
          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => onPassowrdChanged(e?.target?.value)}
            />
            {isInvalidPassword && (
              <div className="error-message">
                Password should contain alphanumerics and atleast one special
                character
              </div>
            )}
          </div>
          <div className="form-field">
          <button class="btn" type="submit">Log in</button>
          </div>
        </form>
      </div>
      {isInvalidLogin && (
        <div className="login-error"> Invalid login credentials </div>
      )}
    </div>
  );
}
