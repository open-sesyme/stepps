import React from 'react'
import Logo from "../assets/img/Logo.png"

const Login = () => {
    return (
        <div id="login_page">
            <form action="" method="post">
                <img src={Logo} alt="Stepps Logo" className='stepps-logo'/>
                <div className="text-bar">
                    <h3>Welcome back!</h3>
                    <p>Sign in to continue to Stepps.</p>
                </div>
                <input type="email" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <div className="action-btns">
                    <button type="submit" className='main-btn'>Login</button>
                    <button type='button' className='forgot-passwd-btn'>Forgot password?</button>
                </div>

                <p className='bottom-text'>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    )
}

export default Login