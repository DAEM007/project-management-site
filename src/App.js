// All react imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
// All styles import
import './App.css';
// All components import
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import OnlineUsers from './components/OnlineUsers';
// All hooks import
import { useAuthContext } from './hooks/useAuthContext';
// All pages import
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from './pages/signup/Signup';
// All icons import
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

function App() {
  const { user, authIsReady } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="App">
      { authIsReady && (
        <Router>
          { user && 
            <>
              <AiOutlineMenu 
                className={`menu-open ${ isOpen ? 'open' : 'close' }`}
                onClick={toggleMenu}
              />
              <AiOutlineClose
                className={`menu-close ${ !isOpen ? 'open' : 'close' }`}
                onClick={toggleMenu}
              />
            </>
          }
          { user && <SideBar sidebarVisible={sidebarVisible} /> }
          <div className="container">
            <NavBar />
            <Routes>
              <Route 
                path='/' 
                element={ user ? <Dashboard /> : <Navigate to="/login" /> } 
              />
              <Route 
                path='/project/:id'
                element={ user ? <Project /> : <Navigate to="/login" /> } 
              />
              <Route 
                path='/create'
                element={ user ? <Create /> : <Navigate to="/login" /> } 
              />
              <Route 
                path='/login' 
                element={ !user ? <Login /> : <Navigate to="/" /> }
              />
              <Route 
                path='/signup'
                element={ !user ? <Signup /> : <Navigate to="/" /> } 
              />
            </Routes>
          </div>
          { user && <OnlineUsers /> }
        </Router>
      )}
    </div>
  );
}

export default App;


