import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import Balance from "./Balance";
import Card from "./Card";
import "./Deposit.css";

function Deposit() {
  const ctx = useContext(UserContext);
  const [deposit, setDeposit] = useState("");
  let audio = new Audio("alert.wav");

  function handleSubmit(e) {
    e.preventDefault();
    if (isNaN(deposit)) {
      audio.play();
      alert("Error: Enter a Number");
      setDeposit("");
    } else if (deposit <= 0) {
      audio.play();
      alert("Error: Please Enter a positive Number");
      setDeposit("");
    } else {
      ctx.users[0].balance += Number(deposit);
      alert("Deposit of " + Number(deposit) + " was Success");
      setDeposit("");
    }
  }

  return (
    <Card
      txtcolor="black"
      header="Deposit"
      body={
        <>
          <Balance />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputDiposit">Diposit Amount</label>
              <input
                type="text"
                className="form-control"
                id="inputDiposit"
                min="0"
                value={deposit}
                onChange={(e) => {
                  setDeposit(e.currentTarget.value);
                }}
                required
              />
            </div>
            <button type="submit" className="btn btn-light" disabled={!deposit}>
              Deposit
            </button>
          </form>
        </>
      }
    />
  );
}

export default Deposit;
