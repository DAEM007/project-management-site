
// All styles import
import "./ProjectList.css";

const ProjectList = ({ projects }) => {
    return (
        <div>
            { projects.length === 0 && <p className="error">No projects to display</p> }
            { projects.map(project => (
                <div key={project.id}>{project.name}</div>
            )) }
        </div>
    );
}
 
export default ProjectList;