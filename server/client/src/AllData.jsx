import React, { useState } from "react";
import "./AllData.css";
import Card from "./Card";

function AllData() {
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [accountData, setAccountData] = useState();

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        setEmailData(data.map((singleData) => <p>{singleData.email}</p>));
        setNameData(data.map((singleData) => <p>{singleData.name}</p>));
        setPasswordData(data.map((singleData) => <p>{singleData.password}</p>));
        setAccountData(data.map((singleData) => <p>{singleData.account}</p>));
      });
  }, []);

  return (
    <>
      <h2>All Data </h2>
      <br />
      <div className="card-group">
        <Card txtcolor="black" header="Name" body={nameData} />
        <Card txtcolor="black" header="Email" body={emailData} />
        <Card txtcolor="black" header="Password" body={passwordData} />
        <Card txtcolor="black" header="AccountType" body={accountData} />
      </div>
    </>
  );
}

export default AllData;
