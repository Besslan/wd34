import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Login() {
  const { login, loading, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <form className="login-form" onSubmit={submit}>
              <div className="input">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  names="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input">
                <input type="submit" />
              </div>
            </form>
          ) : (
            <Navigate to="/" />
          )}
        </>
      )}
    </>
  );
}

export default Login;
