import { createContext, useState } from "react";

const AuthContext = createContext({});

export const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
