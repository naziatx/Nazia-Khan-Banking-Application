import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import Balance from "./Balance";
import Card from "./Card";
import "./Withdraw.css";

function Withdraw() {
  const ctx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [balance,setBalance] = useState('')

  let audio = new Audio("alert.wav");
  function handleSubmit(e) {
    e.preventDefault();
    if (isNaN(amount)) {
      audio.play();
      alert("Error: Enter a Number");
      setAmount("");

      <audio controls play></audio>;
    } else if (amount > Balance) {
      audio.play();

      alert("Transaction Failed: You dont have sufficient balance");
      setAmount("");
    } else if (amount <= 0) {
      audio.play();

      alert("Error: Negative number not allowed");
      setAmount("");
    } else {
      fetch(`/account/update/${email}/-${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            console.log(JSON.stringify(data.value));
            setBalance(data.value.balance - parseInt(amount));

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
                    setEmail("");
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
