import logo from "../../../assets/company-logo.png";
import classes from "./Wrapper.module.css";

const Wrapper2 = () => {
  return (
    <div className={`${classes.header} ${classes.text}`}>
      <img src={logo} alt="logo" className={classes.logoMain} />
    </div>
  );
};

export default Wrapper2;
