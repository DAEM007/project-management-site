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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Thumbnail updated!');
        console.log(name, password, email, thumbnail);
    }

    const handleThumbnail = (e) => {
        setThumbnailError(null);
        let selected = e.target.files[0];

        // console.log(selected);

        if(!selected){
            setThumbnailError('Please select a file');
            return;
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Please select an Image file');
            return;
        }
        if(selected.size > '100000'){
            setThumbnailError('File size must not exceed 100kb');
            return;
        }

        setThumbnailError(null);
        setThumbnail(selected);
        
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
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
                { thumbnailError && <div className="error">{ thumbnailError }</div> }
            </label>
            <button className="btn">Sign up</button>
        </form>
    );
}

export default Signup;