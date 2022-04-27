import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark nav nav-pills" id="navbar">
        <Link
          to="/"
          className="navbar-brand"
          data-toggle="tab"
          data-placement="bottom"
          title="Click to go to home Screen"
        >
          Non-Cents Bank
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end mb-6" id="navbarNav">
          <ul className="navbar-nav nav">
            <li className="nav-item">
              <Link
                to="/CreateAccount/"
                className="nav-link"
                data-toggle="tab"
                data-placement="bottom"
                title="Click Here to create an account"
              >
                Create Account
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/deposit/"
                className="nav-link "
                data-toggle="tab"
                data-placement="bottom"
                title="Click Here to Deposit money to your account"
              >
                Deposit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/withdraw/"
                className="nav-link"
                data-toggle="tab"
                data-placement="bottom"
                title="Click Here to Withdraw money from your account"
              >
                Withdraw
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/alldata/"
                className="nav-link"
                data-toggle="tab"
                data-placement="bottom"
                title="Click Here to check Alldata"
              >
                AllData
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
