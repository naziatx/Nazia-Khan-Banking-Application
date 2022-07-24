import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import Card from "./Card";
import "./Deposit.css";

function Deposit(props) {
  const { user } = useContext(AuthContext);

  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
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
    } else if (amount <= 0) {
      audio.play();
      alert("Error: Please Enter a positive Number");
      setAmount("");
    } else {
      fetch(`/account/update/${email}/${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            if (JSON.stringify(data.value) !== "null") {
              setShow(false);
              console.log("JSON:", data);
              alert("Deposit of " + Number(amount) + " was Success");
            }
          } catch (err) {
            setStatus("Deposit failed");
            console.log("err:", text);
          }
        });
      setAmount("");
    }
  }

  return (
    <Card
      txtcolor="black"
      header="Deposit"
      status={status}
      body={
        <>
          <br />
          <form onSubmit={handleSubmit}>
            {show ? (
              <div>
                <div className="form-group">
                  <label htmlFor="inputDiposit">Deposit Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDiposit"
                    placeholder="Enter Amount"
                    min="0"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.currentTarget.value);
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-light" disabled={!amount}>
                  Deposit
                </button>
              </div>
            ) : (
              <div>
                <div className="balance">
                  {" "}
                  <h5>Balance: </h5>
                  <p>{balance}</p>
                </div>

                <button
                  className="btn btn-light"
                  onClick={() => {
                    setShow(true);
                    setStatus("");
                  }}
                >
                  Deposit Again
                </button>
              </div>
            )}
          </form>
        </>
      }
    />
  );
}

export default Deposit;
