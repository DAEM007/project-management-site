// All styles
import "./OnlineUsers.css";
// All hooks import
import useCollection from "../hooks/useCollection";
// All component imports
import Avatar from "./Avatar";

const OnlineUsers = () => {
    const { documents, error, isPending } = useCollection('users');

    return (
        <div className="user-list">
            <h2>All users</h2>
            { error && <div className="error">{ error }</div> }
            { isPending && <div className="loading">Loading users...</div> }
            { documents && documents.map((user) => (
                <div key={user.id} className="user-list-item">
                     <span>{ user.displayName }</span>
                     <Avatar src={ user.photoURL } />
                </div>
            )) }
        </div>
    );
}
 
export default OnlineUsers;