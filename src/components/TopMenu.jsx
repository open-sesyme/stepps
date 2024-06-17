import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../slices/userSlice';


const TopMenu = () => {
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error)
  return (
    <div className='top-menu'>
        {error && <p className='m-0'>{error}</p>}
        {loading && <p className='m-0'>Loading...</p>}
        {currentUser && <h4>Hello, {currentUser?.name}</h4>}
        
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