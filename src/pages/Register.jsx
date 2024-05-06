import React, {useState} from 'react'
import Logo from "../assets/img/Logo.png"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Register = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const [typeAttr, setTypeAttr] = useState('password')

    const handleShowPassword = () => {
        setShowPassword(!isShowPassword);

        if(isShowPassword)
            setTypeAttr('password');
        else
            setTypeAttr('text')
            
    }
    return (
        <div id="register_page">
            <form action="" method="post">
                <img src={Logo} alt="Stepps Logo" className='stepps-logo'/>
                <div className="text-bar">
                    <h3>Create an Account</h3>
                    <p>Register to start with Stepps.</p>
                </div>
                <input type="text" name="name" id="name" placeholder='Name' />
                <input type="text" name="surname" id="surname" placeholder='Surname' />
                <input type="email" name="email" id="email" placeholder="Email" />
                <div className='password-container'>
                    <input type={typeAttr} name="password" id="password" placeholder="Password" />
                    <button type='button' onClick={handleShowPassword}>{isShowPassword ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}</button>
                </div>
                <button type="submit" className='main-btn'>Register</button>

                <p className='bottom-text'>Have an account? <a href="/">Login</a></p>
            </form>
        </div>
    )
}

export default Register;