// All react imports
import { NavLink } from "react-router-dom";
// All styles import
import "./SideBar.css";
// All images import
import DashBoardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    {/* avatar and username here later */}
                    <p>Hey user</p>
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
    );
}

export default SideBar;

