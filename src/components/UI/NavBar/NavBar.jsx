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
            <NavLink activeClassName={classes.active} to="/connexadmin/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/connexadmin/create">
              Create
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/connexadmin/search">
              Search
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName={classes.active} to="/connexadmin/branding">
              Branding
            </NavLink>
          </li>
          <li>
            <NavLink to="/connexadmin" onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
