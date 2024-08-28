import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftNav.css';

const LeftNav = () => {
  return (
    <nav className="left-nav">
      <div className="nav-user">
        <img src="/path-to-user-image.jpg" alt="User" className="user-avatar" />
        <span className="user-name">Username</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/personal-library" activeClassName="active-link">
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
