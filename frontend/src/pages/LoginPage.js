import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authenticate } from '../api/authApi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleAuthentication() {
        authenticate({ email, password })
            .then((a) => {
                alert('authentication successful!');
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    return (
        <div className="forms-container">
            <div className="form-container">
                <h1>Login</h1>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="button" onClick={handleAuthentication}>Login</button>
                <div style={{ display: 'flex'}}>
                    <Link to="/register" style={{marginRight: 12, marginTop: 12}}>
                        Register
                    </Link>
                    <Link to="/" style={{marginRight: 12, marginTop: 12}} >
                        MySharks
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
