import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";

const NavBar = () => {
  let store = JSON.parse(localStorage.getItem("login"));
  let isAdmin = false;
  if (store?.Token && store?.Role === "A") {
    isAdmin = true;
  }

  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {isAdmin ? (
            <li>
              <NavLink to="/connexadmin/home">
                Admin Side
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
