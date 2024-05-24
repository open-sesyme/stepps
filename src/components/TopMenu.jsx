import React from 'react'
import { Link } from 'react-router-dom'

const TopMenu = () => {
  return (
    <div className='top-menu'>
        <h4>Hello, John Doe</h4>
        
        <ul className="list-unstyled">
            <li>
                <Link to="/home"><i className='bi bi-bell-fill'></i></Link>
            </li>
            <li>
                <Link to="/home"><i class="bi bi-person-circle"></i></Link>
            </li>
        </ul>
    </div>
  )
}

export default TopMenu