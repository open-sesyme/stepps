import PersonIcon from '@mui/icons-material/Person';
import Logo from "../assets/img/Logo.png"

const Navigation = () => {
    return(
        <div className="navigation">
            <img src={Logo} alt="Stepps Logo" />
            <div className="menu-item">
                <button type='button'>
                    <PersonIcon />
                </button>
            </div>
        </div>
    )
}

export default Navigation;