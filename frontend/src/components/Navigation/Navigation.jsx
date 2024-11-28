// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { ImHome } from 'react-icons/im'
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

//   state.session.user
  return (
    <nav id='nav-bar'>
      <ul id='nav-list'>
        <li className='nav-list-link'>
          <NavLink to="/" id="homeButton"><ImHome id='home-button-image'/></NavLink>
        </li>
      {isLoaded && (
        <li className='nav-list-link'>
          {sessionUser ? (
            <>
              <Link to='spots/newSpot' id='nav-create-spot'>Create a New Spot</Link>
            </>
           ) : ( 
            <>
            </>
            )}
          <ProfileButton user={sessionUser} id='profile-image'/>
        </li>
      )}
      </ul>
    </nav>
  );
}

export default Navigation;