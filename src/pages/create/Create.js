// All react imports
import { useState } from "react";
// All styles
import "./Create.css";

const Create = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, dueDate);
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
                <button className="btn">Add Project</button>
            </form>
        </div>
    );
}

export default Create;