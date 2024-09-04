import { useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  // Only render the navigation for certain paths
  if (location.pathname === "/library", "/explorer") {
    return null;
  }

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
