import React, { useState } from "react";
import Card from "./Card";
import "./CreateAccount.css";

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const url = `/account/create/${name}/${email}/${password}/${account}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      alert("Account created successfully. Please Login to continue");
      setShow(false);
    })();
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    return false;
  }

  return (
    <>
      <Card
        txtcolor="#212121"
        header="Create Account"
        status={status}
        body={
          <>
            <form onSubmit={handleCreate}>
              {show ? (
                <div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="input"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      required
                    />
                  </div>
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
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      minLength="8"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <p>Choose Account Type</p>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="accountType"
                        id="checkingAccount"
                        value="checkingAccount"
                        onChange={(e) => {
                          setAccount(e.currentTarget.value);
                        }}
                        required
                      />
                      <label className="form-check-label" htmlFor="checkingAccount">
                        Checking Account
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="accountType"
                        id="savingAccount"
                        value="savingAccount"
                        onChange={(e) => {
                          setAccount(e.currentTarget.value);
                        }}
                      />
                      <label className="form-check-label" htmlFor="savingAccount">
                        Saving Account
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-light" disabled={!(name || email || password || account)}>
                    Create Account
                  </button>
                </div>
              ) : (
                <div>
                  <h3>Success</h3>
                  <button type="button" className="btn btn-light" onClick={clearForm}>
                    Add another account
                  </button>
                </div>
              )}
            </form>
          </>
        }
      />
    </>
  );
}

export default CreateAccount;
