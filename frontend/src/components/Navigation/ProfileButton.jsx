import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ImUser } from "react-icons/im";
import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import ManageSpots from "../Spots/ManageSpots";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
  return (
    <>
      <button id="profileButton" onClick={toggleMenu}>
        <ImUser id='profileButtonImage'/>
      </button>
      <ul className={`profile-dropdown ${showMenu ? 'show' : 'hidden'}`} ref={ulRef}>
        {user ? (
          <>
            <li className="logged-in">Hello, {user.firstName}</li>
            <li className="logged-in">{user.email}</li>
            <br/>
            <Link to='/spots/current'>Manage Spots</Link>
            <br/>
            <br/>
            <li className="logged-in">
              <button id='logout-button' onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <div>
              <OpenModalButton
                className='modal-buttons'
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div>
              <OpenModalButton
                className='modal-buttons'
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}
  
  export default ProfileButton;