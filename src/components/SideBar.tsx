import { NavLink } from "react-router-dom";
import "./SideBar.css";
import DashBoardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineClose } from "react-icons/ai";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideBar = ({ isOpen, toggleMenu }: SidebarProps) => {
  const { user } = useAuthContext();
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;

  return (
    <>
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-content">
          <div className="user">
            <AiOutlineClose className="close-menu-open" onClick={toggleMenu} />
            {photoURL && <Avatar src={photoURL} />}
            <p>Hey {displayName} </p>
          </div>
          <nav className="links">
            <ul>
              <li>
                <NavLink end to="/">
                  <img src={DashBoardIcon} alt="dashboard-icon" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/create">
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
};

export default SideBar;
