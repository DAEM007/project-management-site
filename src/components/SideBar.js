// All react imports
import { NavLink } from "react-router-dom";
// All styles import
import "./SideBar.css";
// All images import
import DashBoardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
// All components import
import Avatar from "./Avatar";
// All hooks import
import { useAuthContext } from "../hooks/useAuthContext";
// All icons import
import { AiOutlineClose } from "react-icons/ai";

const SideBar = ({ isOpen, toggleMenu }) => {
    const { user } = useAuthContext();
    const { displayName, photoURL } = user;

    return (
        <>
            <div className={`sidebar ${ isOpen ? 'sidebar-open': ''}`}>
                <div className="sidebar-content">
                    <div className="user">
                        <AiOutlineClose 
                            className="close-menu-open"
                            onClick={toggleMenu}
                        />
                        <Avatar src={ photoURL } />
                        <p>Hey { displayName } </p>
                    </div>
                    <nav className="links">
                        <ul>
                            <li>
                                <NavLink end to="/" 
                                    onClick={toggleMenu}
                                >
                                    <img src={DashBoardIcon} alt="dashboard-icon" />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink to="/create" 
                                    onClick={toggleMenu}
                                >
                                    <img src={AddIcon} alt="add-project-icon" />
                                    <span>New Project</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </>
    );
}

export default SideBar;

