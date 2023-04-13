// All react imports
import { useState } from "react";
// All firebase imports
import { timestamp } from "../../firebase/Config";
// All hooks imports
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";


const ProjectComments = ({ project }) => {
    const { updateDocument, response } = useFirestore('projects');
    const { user } = useAuthContext();
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.now(),
            id: Math.random()
        }

        await updateDocument(project.id, {
            Comments: [{ ...project.Comments, commentToAdd }],
        })

        if(!response.error) {
            setNewComment('');
        }

      }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                <span>Add new comment:</span>
                <textarea
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    );
}
 
export default ProjectComments;