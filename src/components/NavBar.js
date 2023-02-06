// All react imports
import { Link } from "react-router-dom";
// All styles
import "./NavBar.css";
// All images import
import temple from "../assets/temple.svg";

const NavBar = () => {
    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={temple} alt="temple-logo" />
                    <span>DAEM</span>
                </li>
                <li> <Link to="/signup">Signup</Link> </li>
                <li> <Link to="/login">Login</Link> </li>

                
                <li>
                    <button className="btn">Logout</button>
                </li>
            </ul>
        </div>
    );
}
 
export default NavBar;