import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import Balance from "./Balance";
import Card from "./Card";
import "./Deposit.css";

function Deposit(props) {
  const ctx = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [balance,setBalance] = useState("")
  let audio = new Audio("alert.wav");

  function handleSubmit(e) {
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
            setBalance(data.value.balance + parseInt(amount));

            console.log(JSON.stringify(data.value));
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
              <div className="balance"> <h5>Balance: </h5>
                <p>{balance}</p></div>
               
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setShow(true);
                    setStatus("");
                    setEmail("");
                    setAmount('');
                    setBalance('')
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
