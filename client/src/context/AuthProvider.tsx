import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import Auth from "../utils/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = Auth.getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    Auth.clearToken(); // Clear token from local storage
    setToken(""); // Clear token from state
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};