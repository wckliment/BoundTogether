import { useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { NavLink } from 'react-router-dom';
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  
  if (location.pathname === "/library" || location.pathname === "/explorer" || location.pathname === "/exchange-requests") {
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
