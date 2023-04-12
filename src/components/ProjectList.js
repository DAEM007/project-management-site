// All react imports
import { Link } from "react-router-dom";
// All components imports
import Avatar from "./Avatar";
// All styles import
import "./ProjectList.css";

const ProjectList = ({ projects }) => {
    return (
        <div className="project-list">
            { projects.length === 0 && <p className="error">No projects to display</p> }
            { projects.map(project => (
                <Link to={`/project/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by: {project.dateDue.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        <p><strong> Assigned to: </strong></p>
                        <ul>
                            { project.assignedUserList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL}/>
                                </li>
                            )) }
                        </ul>
                    </div>
                </Link>
            )) }
        </div>
    );
}
 
export default ProjectList;