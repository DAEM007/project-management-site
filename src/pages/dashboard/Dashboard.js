// All styles
import ProjectList from "../../components/ProjectList";
import useCollection from "../../hooks/useCollection";
import "./Dashboard.css";

const Dashboard = () => {
    const {documents, error} = useCollection('projects');

    return (
        <div>
            <h2 className="project-title">Dashboard</h2>
            { error && <p className="error">{error}</p> }
            { documents && <ProjectList projects={documents} /> }
        </div>
    );
}
 
export default Dashboard;