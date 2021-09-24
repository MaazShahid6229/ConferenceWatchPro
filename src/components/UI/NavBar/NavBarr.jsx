import classes from "./NavBarr.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/company-logo.png";

const NavBarr = () => {
  return (
    <nav className={classes.navbar}>
      <div>
        <NavLink activeClassName={classes.active} to="/Hello">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      {/* <a href="#" class="toggle-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </a> */}
      <ul className={classes["nav-list"]}>
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
      </ul>
    </nav>
  );
};
export default NavBarr;
