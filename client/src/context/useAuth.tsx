import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};


// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };