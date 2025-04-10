import { createContext } from "react";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  logout: () => void; // Add logout function
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  logout: () => {}, // Default implementation
});