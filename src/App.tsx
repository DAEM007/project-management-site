import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import OnlineUsers from "./components/OnlineUsers";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { AiOutlineMenu } from "react-icons/ai";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && (
            <>
              <AiOutlineMenu
                className={`menu-open ${isOpen ? "open" : "close"}`}
                onClick={toggleMenu}
              />
            </>
          )}
          {user && <SideBar isOpen={isOpen} toggleMenu={toggleMenu} />}
          <div className="container">
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/project/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </Router>
      )}
    </div>
  );
}

export default App;
