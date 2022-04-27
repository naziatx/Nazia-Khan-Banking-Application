import React from "react";
import { UserContext } from "./App";
import Card from "./Card";
/* import Card from "./context";
 */
import "./CreateAccount.css";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    ctx.users.push({ name, email, password, balance: 100 }) && alert("Account created successfully");

    setShow(false);
    e.preventDefault();
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
              {show ? (
                <button type="submit" className="btn btn-light" disabled={!(name || email || password)}>
                  Create Account
                </button>
              ) : (
                <button type="button" className="btn btn-light" onClick={clearForm}>
                  Add another account
                </button>
              )}
            </form>
          </>
        }
      />
    </>
  );
}

export default CreateAccount;
