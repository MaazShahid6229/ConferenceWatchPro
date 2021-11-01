import logo from "../../../assets/company-logo.png";
import UserNavBar from "../NavBar/UserNavBar";
import classes from "./Wrapper.module.css";

const UserSideWrapper = () => {
  return (
      <div className={classes.header}>
        <div className={classes.pgSize}>
          <img src={logo} alt="logo" className={classes.logoMain} />
          <UserNavBar/>
        </div>
      </div>
  );
};

export default UserSideWrapper;
