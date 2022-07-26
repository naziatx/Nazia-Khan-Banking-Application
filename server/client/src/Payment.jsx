import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import Card from "./Card";
import "./Payment.css";
function Payment() {
  const { user } = useContext(AuthContext);
  const [receiverEmail, setReceiverEmail] = useState("");
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
      //deposit money in receiver account

      fetch(`/account/update/${receiverEmail}/${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);

            if (JSON.stringify(data.value) === "null") {
              console.log(data);
              setStatus("User not found");
            } else if (JSON.stringify(data.value) !== "null") {
              //withdraw money from sender account

              fetch(`/account/update/${email}/-${amount}`)
                .then((response) => response.text())
                .then((text) => {
                  try {
                    const data = JSON.parse(text);
                    if (JSON.stringify(data.value) !== "null") {
                      setShow(false);
                      setStatus("");

                      console.log("JSON:", data);
                      alert("Transfer of " + Number(amount) + " was success");
                    }
                  } catch (err) {
                    setStatus("Withdraw failed");
                    console.log("err:", text);
                  }
                });

              setShow(false);
              console.log("JSON:", data);
              setReceiverEmail("");
              setAmount("");
            }
          } catch (err) {
            setStatus("Deposit failed");
            console.log("err:", text);
          }
        });
    }
  }

  return (
    <Card
      txtcolor="black"
      header="Payment Transfer"
      status={status}
      body={
        <>
          <br />
          <form onSubmit={handleSubmit}>
            {show ? (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Receiver's Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.currentTarget.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputDiposit"></label>
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
                  Transfer
                </button>
              </div>
            ) : (
              <div>
                <div className="balance">
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
                  Transfer Again
                </button>
              </div>
            )}
          </form>
        </>
      }
    />
  );
}

export default Payment;
