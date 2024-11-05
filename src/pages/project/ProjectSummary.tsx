import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";
import { Project } from "./ProjectData";

interface ProjectSummaryProps {
  project: Project;
}

export default function ProjectSummary({ project }: ProjectSummaryProps) {
  const { DeleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    DeleteDocument(project.id);
    navigate("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dateDue.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUserList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
