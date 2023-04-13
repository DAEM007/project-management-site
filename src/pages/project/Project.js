// All react imports
import { useParams } from "react-router-dom";
// All styles
import "./Project.css";
// All hooks import
import useDocument from "../../hooks/useDocument";
// All components imports
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

const ProjectDetails = () => {
    const { id } = useParams();
    const { document, error } = useDocument('projects', id);

    return (
        <div className="project-details">
            { error && <div className="error">{error}</div> }
            { !document && <div className="loading">Loading...</div> }
            { document && <ProjectSummary project={document} /> }
            { document && <ProjectComments project={document} /> }
        </div> 
    );
}
 
export default ProjectDetails;