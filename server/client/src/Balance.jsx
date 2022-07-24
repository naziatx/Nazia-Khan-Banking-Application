import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import "./Balance.css";
import Card from "./Card";

function Balance(props) {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);

  function findBalance(e) {
    let email = user.email;

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
        header="Check Balance"
        status={status}
        body={
          <form onSubmit={findBalance}>
            {show ? (
              <div>
                <button type="submit" className="btn btn-light">
                  Check Balance
                </button>
              </div>
            ) : (
              <div>
                <div className="balance">
                  <h5>Balance:</h5>
                  <p>{balance}</p>
                </div>
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={() => {
                    setStatus("");
                  }}
                >
                  Refresh Balance
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
