import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";

const NavBar = () => {
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
            <NavLink activeClassName={classes.active} to="/Hello">
              Search
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Branding
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
