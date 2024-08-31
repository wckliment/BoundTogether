import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';
import './LeftNav.css';

const LeftNav = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();

  // Log the user object to verify its contents
  console.log("User Info:", user);

  const toggleUserInfo = () => {
    console.log("User icon clicked");
    setShowUserInfo(!showUserInfo);
    console.log("showUserInfo state:", !showUserInfo);
  };

  const handleClickOutside = (event) => {
    if (userRef.current && !userRef.current.contains(event.target)) {
      console.log("Click outside detected, closing user info");
      setShowUserInfo(false);
    }
  };

  useEffect(() => {
    if (showUserInfo) {
      console.log("Adding event listener for outside clicks");
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      console.log("Removing event listener for outside clicks");
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserInfo]);

  const handleLogout = () => {
    console.log("Logging out");
    dispatch(thunkLogout());
    navigate('/');
  };

  return (
    <nav className="left-nav">
      <div className="nav-user" ref={userRef}>
        <button className="user-button" onClick={toggleUserInfo}>
          <i className="fas fa-user user-icon"></i>
        </button>
        {showUserInfo && user && (
          <div className="user-info">
            <div className="user-name">{user.username}</div>
            <div className="user-email">{user.email}</div>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/library" activeClassName="active-link">
            Personal Library
          </NavLink>
        </li>
        <li>
          <NavLink to="/book-explorer" activeClassName="active-link">
            Book Explorer
          </NavLink>
        </li>
        <li>
          <NavLink to="/exchange-requests" activeClassName="active-link">
            Exchange Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNav;
