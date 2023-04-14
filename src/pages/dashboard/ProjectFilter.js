
// list to filter
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = ({ currentFilter, changeFilter }) => {

    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }

    return (
        <div className="project-filter">
        <nav>
            <p>Filter by: </p>
            {filterList.map((f) => (
            <button key={f}
                onClick={() => handleClick(f)}
                className={currentFilter === f ? 'active' : ''}
            >{f}</button>
            ))}
        </nav>
        </div>
    )
}
 
export default ProjectFilter;