// All react imports
import { NavLink } from "react-router-dom";
import { useState } from "react";
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

const SideBar = ({ sidebarVisible }) => {
    const { user } = useAuthContext();
    // destructure needed properties from the user object
    const { displayName, photoURL } = user;
    const [close, setClose] = useState(false);

    console.log(close);

    const handleClose = () => {
        setClose(!close);
    };

    return (
        <>
            <div className={`sidebar ${ sidebarVisible ? 'sidebar-open': ''} ${ close ? 'sidebar' : ''}`}>
                <div className="sidebar-content">
                    <div className="user">
                        <AiOutlineClose 
                            className={`close-menu-open`}
                            onClick={handleClose}
                        />
                        <Avatar src={ photoURL } />
                        <p>Hey { displayName } </p>
                    </div>
                    <nav className="links">
                        <ul>
                            <li>
                                <NavLink end to="/" >
                                    <img src={DashBoardIcon} alt="dashboard-icon" />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink to="/create" >
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

