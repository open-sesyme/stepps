import React, { useEffect, useState } from 'react';
import Logo from "../assets/img/Logo.png";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../config/firebase';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const oobCode = searchParams.get('oobCode');

    useEffect(() => {
        if (!oobCode) {
            setError('Invalid or missing password reset code.');
            return;
        }
    
        verifyPasswordResetCode(auth, oobCode).then((email) => {
            setMessage(`Enter a new password for ${email}`);
        }).catch((error) => {
            setError('The password reset link is invalid or has expired.');
        });
    }, [oobCode]);

    const handlePasswordReset = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
    
        try {
          await confirmPasswordReset(auth, oobCode, password);
          setMessage('Password has been reset successfully. You can now log in with your new password.');
          navigate('/'); // Redirect to login page after successful reset
        } catch (error) {
          setError('Error resetting password. Please try again.');
        }
    };

    return (
        <div className='password-reset'>
            <div className='header-part'>
                <img src={Logo} alt="stepps logo" />
            </div>
            <div className='form-container'>
                <form onSubmit={handlePasswordReset}>
                    <div className='form-header'>
                        <span className='password-icon'>
                            <span>*</span>
                            <span>*</span>
                            <span>*</span>
                            <span>*</span>
                        </span>
                        <h4>Set new password</h4>
                        <p>Must be at least 8 characters.</p>
                    </div>

                    {error && <p className="error-text">{error}</p>}
                    {message && <p className="success-message">{message}</p>}

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    <label htmlFor="c_password">Confirm password</label>
                    <input type="password" name="c_password" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>

                    <button type="submit" className="main-btn">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword