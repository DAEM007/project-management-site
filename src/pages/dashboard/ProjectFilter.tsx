// list to filter
const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

interface ProjectFilterProps {
  currentFilter: string;
  changeFilter: (string: string) => void;
}

const ProjectFilter = ({ currentFilter, changeFilter }: ProjectFilterProps) => {
  const handleClick = (newFilter: string) => {
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
