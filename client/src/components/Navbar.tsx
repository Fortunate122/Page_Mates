import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Correct import
import Auth from "../utils/auth";

const Navbar = () => {
  const { token, logout } = useAuth(); // Access logout from useAuth
  const user = Auth.getProfile() as { username?: string };

  return (
    <nav>
      <Link to="/home">Home</Link>
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/search">Search</Link>
          {user?.username && <span style={{ margin: "0 1rem" }}>Welcome, {user.username}!</span>}
          <button onClick={logout} style={{ marginLeft: "1rem" }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;