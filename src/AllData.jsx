import React from "react";
import { UserContext } from "./App";
import "./AllData.css";
import Card from "./Card";

function AllData() {
  const ctx = React.useContext(UserContext);

  return (
    <>
      <h2>All Data</h2>
      <br />
      <div className="card-group">
        <Card
          txtcolor="black"
          header="Name"
          body={ctx.users.map((user) => (
            <p className="card-text">{user.name} </p>
          ))}
        />
        <Card
          txtcolor="black"
          header="Email"
          body={ctx.users.map((user) => (
            <p>{user.email} </p>
          ))}
        />
        <Card
          txtcolor="black"
          header="Name"
          body={ctx.users.map((user) => (
            <p>{user.password} </p>
          ))}
        />
      </div>

      {/*  ctx.users.map(createCard) */}
    </>
  );
}

export default AllData;
