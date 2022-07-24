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
  );
}

export default Home;
