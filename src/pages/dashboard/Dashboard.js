// All react imports
import { useState } from "react";
// All styles
import "./Dashboard.css";
// All component imports
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
// All hooks import
import useCollection from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";


const Dashboard = () => {
    const { user } = useAuthContext();
    const {documents, error} = useCollection('projects');
    const [filter, setFilter] = useState('all');

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const projects = documents ? documents.filter(document => {
        switch(filter) {
          case 'all':
            return true
          case 'mine':
            let assignedToMe = false
            document.assignedUserList.forEach(u => {
              if(u.id === user.uid) {
                assignedToMe = true
              }
            })
            return assignedToMe
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            console.log(document.category, filter)
            return document.category === filter
          default:
            return true
        }
      }) : null

    return (
        <div>
            <h2 className="project-title">Dashboard</h2>
            { error && <p className="error">{error}</p> }
            { documents && 
                (<ProjectFilter 
                    currentFilter={filter}
                    changeFilter={changeFilter}
                />) }
            {projects && <ProjectList projects={projects} />}
        </div>
    );
}
 
export default Dashboard;