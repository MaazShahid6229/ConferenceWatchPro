import logo from "../../../assets/company-logo.png";
import classes from "./Wrapper.module.css";

const Wrapper = () => {
  return (
      <div className={classes.header}>
          <img src={logo} alt="logo" />
      </div>
  );
};

export default Wrapper;
