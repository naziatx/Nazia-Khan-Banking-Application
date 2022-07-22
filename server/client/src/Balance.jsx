import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import "./Balance.css";
import Card from "./Card";

function Balance(props) {
  const ctx = useContext(UserContext);
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");

  function findBalance(e) {
    e.preventDefault();

    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          setShow(false);
          setBalance(data.balance);
          console.log("JSON:", data);
        } catch (err) {
          setStatus(text);
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      <Card
        txtcolor="#212121"
        header="Create Account"
        status={status}
        body={
          <form onSubmit={findBalance}>
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
                </div>
                <button type="submit" className="btn btn-light" disabled={!email}>
                  Find Balance
                </button>
              </div>
            ) : (
              <div>
                <div className="balance">
                  <h5>Balance:</h5>
                  <p>{balance}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setShow(true);
                    setStatus("");
                    setEmail("");
                  }}
                >
                  Find Again
                </button>
              </div>
            )}
          </form>
        }
      />
    </>
  );
}

export default Balance;
