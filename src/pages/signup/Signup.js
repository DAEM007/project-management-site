// All react imports
import { useState } from "react";
// All styles
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    return (
        <form className="auth-form">
            <h2>Sign up here...</h2>
            <label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required 
                />
            </label>
            <label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required 
                />
            </label>
            <label>
                <input 
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required 
                />
            </label>
            <label>
                <input 
                    type="file"
                    required 
                />
            </label>
            <button className="btn">Sign up</button>
        </form>
    );
}

export default Signup;