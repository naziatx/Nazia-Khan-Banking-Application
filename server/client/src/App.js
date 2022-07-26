import React from "react";
import "./App.css";

import Navbar from "./Navbar";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import AllData from "./AllData";
import Login from "./Login";
import Balance from "./Balance";
import Logout from "./Logout";
import Payment from "./Payment";

export const UserContext = React.createContext(null);

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <UserContext.Provider
          value={{ users: [{ name: "abel", email: "abel@mit.edu", password: "secret", balance: 100 }] }}
        >
          <div className="container" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/balance/" element={<Balance />} />
              <Route path="/alldata/" element={<AllData />} />
              <Route path="/payment/" element={<Payment />} />

              <Route path="/logout/" element={<Logout />} />

            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
