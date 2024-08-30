import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './LeftNav.css';

const LeftNav = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const user = useSelector((state) => state.session.user);
  const userRef = useRef();

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleClickOutside = (event) => {
    if (userRef.current && !userRef.current.contains(event.target)) {
      setShowUserInfo(false);
    }
  };

  useEffect(() => {
    if (showUserInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserInfo]);

  return (
    <nav className="left-nav">
      <div className="nav-user" ref={userRef}>
        <button className="user-button" onClick={toggleUserInfo}>
          <i className="fas fa-user user-icon"></i>
        </button>
        {showUserInfo && (
          <div className="user-info">
            <div className="user-name">{user?.username}</div>
            <div className="user-email">{user?.email}</div>
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
