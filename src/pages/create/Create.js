// All react imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// All hooks imports
import useCollection from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";
// All firebase imports
import { timestamp } from "../../firebase/Config";
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
    const { user } = useAuthContext();
    const { response, AddDocument } = useFirestore('projects');
    const navigate = useNavigate();
    // options for the assigned users
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);
    // form states
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [errorForm, setErrorForm] = useState(null);

    // map through the documents from the users collection and return a new array of objects that we then use as options in assigned users.
    useEffect(() => {
        if(documents) {
            const options = documents.map((user) => {
                return { 
                    value: user,
                    label: user.displayName
                }
            })
            setUsers(options);
        }
    }, [documents])

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        // checking for errors in the project category and the assigned users
        setErrorForm(null);
        if(!category) {
            setErrorForm('Please select a project category!');
            return;
        }
        if(assignedUsers.length < 1) {
            setErrorForm('Please select at least one(1) assigned user!');
            return;
        }

        // createdBy user
        const createdBy = {
            name: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        // assignedUser 
        const assignedUserList = assignedUsers.map((assignedUser) => {
            return {
                displayName: assignedUser.value.displayName,
                photoURL: assignedUser.value.photoURL,
                id: assignedUser.value.id
            }
        })

        // project object to be saved to firebase
        const project = {
            name,
            details,
            assignedUserList,
            createdBy,
            category: category.value,
            dateDue: timestamp.fromDate(new Date(dueDate)),
            comments: [],
        }

        // save the project document to firestore
        // console.log(project);
        await AddDocument(project);
        
        // Redirect user to the dashboard
        if(!response.error) {
            navigate('/');
        }

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
                { errorForm &&  <p className="error">{ errorForm }</p> }
            </form>
        </div>
    );
}

export default Create;