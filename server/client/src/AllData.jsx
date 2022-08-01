import React, { useState } from "react";
import "./AllData.css";
import Card from "./Card";

function AllData() {
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [balanceData, setBalanceData] = useState("");
  const [accountData, setAccountData] = useState();

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        setEmailData(data.map((singleData) => <p>{singleData.email}</p>));
        setNameData(data.map((singleData) => <p>{singleData.name}</p>));
        setBalanceData(data.map((singleData) => <p>{singleData.balance}</p>));
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
        <Card txtcolor="black" header="AccountType" body={accountData} />
        <Card txtcolor="black" header="Balance" body={balanceData} />

      </div>
    </>
  );
}

export default AllData;
