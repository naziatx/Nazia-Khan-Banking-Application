import React from "react";
import "./AllData.css";
import Card from "./Card";

function AllData() {
  const [nameData, setNameData] = React.useState("");
  const [emailData, setEmailData] = React.useState("");
  const [passwordData, setPasswordData] = React.useState("");

  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        setEmailData(data.map((singleData) => <p>{singleData.email}</p>));
        setNameData(data.map((singleData) => <p>{singleData.name}</p>));
        setPasswordData(data.map((singleData) => <p>{singleData.password}</p>));
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
      </div>

      {/*  ctx.users.map(createCard) */}
    </>
  );
}

export default AllData;
