// All react imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// All styles import
import './App.css';
// All pages import
import Dashboard from "./pages/dashboard/Dashboard";
import ProjectDetails from "./pages/project/ProjectDetails";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from './pages/signup/Signup';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/projectDetails/:id' element={ <ProjectDetails /> } />
            <Route path='/create' element={ <Create /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/signup' element={ <Signup /> } />
          </Routes>
        </Router>
    </div>
  );
}

export default App;


