// All react imports
import { useState } from "react";
// All styles
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);


    const handleThumbnail = (e) => {
        setThumbnailError(null);
        let selected = e.target.files[0];

        console.log(selected);

        if(!selected.type.includes('image')){
            setThumbnailError('Please select an Image file');
            return;
        }
        if(!selected){
            setThumbnailError('Please select a file');
            return;
        }

        
        
    }

    console.log(thumbnailError);

    return (
        <form className="auth-form">
            <h2>Sign up here...</h2>
            <label>
                <span>email:</span>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required 
                />
            </label>
            <label>
                <span>password:</span>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required 
                />
            </label>
            <label>
                <span>name:</span>
                <input 
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required 
                />
            </label>
            <label>
                <span>thumbnail:</span>
                <input 
                    type="file"
                    onChange={handleThumbnail}
                    required 
                />
            </label>
            <button className="btn">Sign up</button>
        </form>
    );
}

export default Signup;