import React, { useState } from "react";
import "./Login.css";
import Card from "./Card";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          setIsLoggedIn(true);
          setStatus("");
          setShow(false);
          console.log("JSON:", data);
          setUserName(data.name);
        } catch (err) {
          setStatus(text);
          console.log("err:", text);
        }
      });
  }
  function clearForm() {
    setUserName("");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setShow(true);
    return false;
  }

  return (
    <div className="login">
      <Card
        txtcolor="#212121"
        header="Login"
        status={status}
        body={
          <>
            <form onSubmit={handleLogin}>
              {show ? (
                <div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      minLength="8"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-light" disabled={!(email || password)}>
                    Login
                  </button>
                </div>
              ) : (
                <div>
                  <h5>Logged In Successfully</h5>
                  <button type="button" className="btn btn-light" onClick={clearForm}>
                    Log out
                  </button>
                </div>
              )}
            </form>
          </>
        }
      />
      <p className="userName">Hello {isLoggedIn ? userName : "Guest"} </p>

       
    </div>
  );
}

export default Login;
