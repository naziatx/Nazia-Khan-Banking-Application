import React from "react";
import "./Home.css";

import Card from "./Card";

function Home() {
  return (
    <div>
      <Card
        txtcolor="black"
        header="Welcome to Non-Cents Bank"
        title="The bank that makes Sense"
        body={<img src={process.env.PUBLIC_URL + "bank.png"} className="img-fluid" alt="bank-logo" />}
      />
    </div>
    /*  <div className="card">
      <img src={process.env.PUBLIC_URL + "bank.png"} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Welcome to the bank</h5>
        <p className="card-text">For all your Banking Needs</p>
      </div>
    </div> */
  );
}

export default Home;
