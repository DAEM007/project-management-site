import { useParams } from "react-router-dom";
import "./Project.css";
import useDocument from "../../hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { document, error } = useDocument("projects", id || "");

  return (
    <div className="project-details">
      {error && <div className="error">{error}</div>}
      {!document && <div className="loading">Loading...</div>}
      {document && <ProjectSummary project={document} />}
      {document && <ProjectComments project={document} />}
    </div>
  );
};

export default ProjectDetails;
