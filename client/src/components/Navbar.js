import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <span>LOGO</span>
      <div className="nav-items">
        {!loading && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={logout}>logout</button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
