// All react imports
import { useEffect, useState } from "react";
import Select from "react-select";
// All hooks imports
import useCollection from "../../hooks/useCollection";
// All styles
import "./Create.css";

// options for categories
const categories = [
    {value: 'development', label: 'Development'},
    {value: 'design', label: 'Design'},
    {value: 'sales', label: 'Sales'},
    {value: 'marketing', label: 'Marketing'},
]

const Create = () => {
    // options for the assigned users
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);
    // form states
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    // map through the documents from the users collection and return a new array of objects
    useEffect(() => {
        if(documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, dueDate, category.value, assignedUsers);
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Add a new Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name: </span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details: </span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Project due date: </span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category: </span>
                    <Select 
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assigned users: </span>
                    <Select 
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className="btn">Add Project</button>
            </form>
        </div>
    );
}

export default Create;