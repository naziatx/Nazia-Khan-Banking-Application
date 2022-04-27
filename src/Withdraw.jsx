import React, { useContext, useState } from "react";
import { UserContext } from "./App";
import Balance from "./Balance";
import Card from "./Card";
import "./Withdraw.css";

function Withdraw() {
  const ctx = useContext(UserContext);
  const [withdraw, setWithdraw] = useState("");
  let audio = new Audio("alert.wav");
  function handleSubmit(e) {
    e.preventDefault();
    if (isNaN(withdraw)) {
      audio.play();
      alert("Error: Enter a Number");
      setWithdraw("");

      <audio controls play></audio>;
    } else if (withdraw > ctx.users[0].balance) {
      audio.play();

      alert("Transaction Failed: You dont have sufficient balance");
      setWithdraw("");
    } else if (withdraw <= 0) {
      audio.play();

      alert("Error: Negative number not allowed");
      setWithdraw("");
    } else {
      ctx.users[0].balance -= Number(withdraw);
      alert("withdraw of " + Number(withdraw) + " was success");
      setWithdraw("");
    }
  }

  return (
    <Card
      txtcolor="black"
      header="Withdraw"
      body={
        <div>
          <Balance />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputWithdraw">Withdraw Amount</label>
              <input
                type="text"
                className="form-control"
                id="inputWithdraw"
                value={withdraw}
                onChange={(e) => {
                  setWithdraw(e.currentTarget.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-light" disabled={!withdraw}>
              Withdraw
            </button>
          </form>
        </div>
      }
    />
  );
}

export default Withdraw;
