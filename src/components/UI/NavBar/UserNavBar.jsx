import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";

const NavBar = () => {

  const logoutHandler=()=>{
    localStorage.clear()
  }
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
