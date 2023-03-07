import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Protected from "./components/Protected";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Protected />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {/* footer */}
    </div>
  );
}

export default App;
