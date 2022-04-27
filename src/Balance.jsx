import React, { useContext } from "react";
import { UserContext } from "./App";
import "./Balance.css";

function Balance(props) {
  const ctx = useContext(UserContext);
  const balance = ctx.users[0]?.balance;

  return (
    <div className="balance d-flex">
      <h5 className="d-inline">Balance: </h5>
      <p className="d-inline ml-auto ">{balance}</p>
    </div>
  );
}

export default Balance;
