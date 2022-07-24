import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import Card from "./Card";
import "./Withdraw.css";

function Withdraw() {
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState("");

  let audio = new Audio("alert.wav");

  useEffect(() => {
    let email = user.email;
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setBalance(data.balance);
          console.log("JSON:", data);
        } catch (err) {
          console.log(err);
        }
      });
  });

  function handleSubmit(e) {
    let email = user.email;
    e.preventDefault();
    if (isNaN(amount)) {
      audio.play();
      alert("Error: Enter a Number");
      setAmount("");

      <audio controls play></audio>;
    } else if (amount <= 0) {
      audio.play();

      alert("Error: Negative number not allowed");
      setAmount("");
    } else if (amount > balance) {
      audio.play();
      alert("Transaction Failed: You dont have sufficient balance");
      setAmount("");
    } else {
      fetch(`/account/update/${email}/-${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            if (JSON.stringify(data.value) !== "null") {
              setShow(false);
              console.log("JSON:", data);
              alert("withdraw of " + Number(amount) + " was success");
            }
          } catch (err) {
            setStatus("Withdraw failed");
            console.log("err:", text);
          }
        });
      setAmount("");
    }
  }

  return (
    <Card
      txtcolor="black"
      header="Withdraw"
      status={status}
      body={
        <div>
          <br />
          <form onSubmit={handleSubmit}>
            {show ? (
              <>
                <div className="form-group">
                  <label htmlFor="inputWithdraw">Withdraw Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputWithdraw"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.currentTarget.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-light" disabled={!amount}>
                  Withdraw
                </button>
              </>
            ) : (
              <div>
                <div className="balance">
                  <h5>Balance:</h5>
                  <p>{balance}</p>
                </div>

                <button
                  className="btn btn-light"
                  onClick={() => {
                    setShow(true);
                    setStatus("");
                  }}
                >
                  Withdraw Again
                </button>
              </div>
            )}
          </form>
        </div>
      }
    />
  );
}

export default Withdraw;
