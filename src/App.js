// All react imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// All styles import
import './App.css';
// All components import
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
// All hooks import
import { useAuthContext } from './hooks/useAuthContext';
// All pages import
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from './pages/signup/Signup';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
        <Router>
          { user && <SideBar /> }
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
        </Router>
      )}
    </div>
  );
}

export default App;


