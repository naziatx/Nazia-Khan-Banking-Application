import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import "./Logout.css"

function Logout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    setAuth(false);
    navigate("/");
  });

  return <div>Logout</div>;
}

export default Logout;
