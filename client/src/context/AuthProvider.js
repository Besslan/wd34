import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users/profile")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = (email, password) => {
    axiosClient
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch((err) => {
        setUser(null);
      });
  };

  const logout = () => {
    axiosClient.get("/auth/logout").then((response) => {
      setUser(null);
      navigate("/");
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
