// All react imports
import { Link } from "react-router-dom";
// All styles
import "./NavBar.css";
// All images import
import temple from "../assets/temple.svg";
// All hooks import
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
    const { error, ispending, logout } = useLogout();
    const { user }  = useAuthContext();

    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={temple} alt="temple-logo" />
                    <span>DAEM</span>
                </li>

                { !user && (
                    <>
                        <li> <Link to="/signup">Signup</Link> </li>
                        <li> <Link to="/login">Login</Link> </li>
                    </>
                ) }
                
                { user && (
                    <li>
                        { !ispending && <button className="btn" onClick={logout}>Logout</button> }
                        { ispending && <button className="btn" disabled >Logging out...</button> }
                        { error && <div>{ error }</div> }
                    </li>
                ) }
                
            </ul>
        </div>
    );
}
 
export default NavBar;