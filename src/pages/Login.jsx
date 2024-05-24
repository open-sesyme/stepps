import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/img/Logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../actions/authActions';
import { selectUser, selectError, selectLoader, setError } from "../slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const error = useSelector(selectError);
    const loading = useSelector(selectLoader);
    const navigate = useNavigate();

    const validateLogin = () => {
        if(!email.trim()) {
            dispatch(setError('Email is required.'));
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            dispatch(setError("Email is invalid."));
            return false;
        } else if (!password.trim()) {
            dispatch(setError("Password is required."));
            return false;
        }

        return true;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setError(""));
        if (validateLogin()) {
            try {
                dispatch(signIn(email, password));
            } catch (error) {
                dispatch(setError(error.message));
            }
        }
    };

    useEffect(() => {
        if (dispatch) {
            if (user) {
                navigate('/home');
            }
        }
    },[dispatch, user])

    return (
        <div id="login_page">
            <div className="form-container">
                    <img src={Logo} alt="stepps Logo" className='stepps-logo'/>
                    <div className="text-bar">
                        <h3>Hello Again!</h3>
                        <p>Sign in to continue with <b>stepps</b></p>
                    </div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value); dispatch(setError(""))}}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value); dispatch(setError(""));}} />
                    <button type='button' className='forgot-passwd-btn'>Forgot password?</button>
                    <button type="submit" className='main-btn' onClick={handleLogin}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {error && <p>{error}</p>}
                
            </div>

            <div className="footer-part">
                <p>{new Date().getFullYear()} &copy; Copyright. All rights reserved by <a href="http://www.opensesyme.com" target="_blank" rel="noopener noreferrer">Open Sesyme</a>.</p>
            </div>
        </div>
    )
}

export default Login