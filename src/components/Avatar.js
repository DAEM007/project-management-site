// All styles
import "./Avatar.css";

const Avatar = ({ src }) => {
    return (
        <div className="avatar">
            <img src={src} alt="avatar-pic" />
        </div>
    );
}
 
export default Avatar;

