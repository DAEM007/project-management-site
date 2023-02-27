// All styles
import { useState } from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
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
            <button className="btn">Login</button>
            {/* { !isPending && <button className="btn">Sign up</button> }
            { isPending && <button className="btn" disabled >Loading...</button> }
            { error && <div className="error">{ error }</div> } */}
        </form>
    );
}
 
export default Login;