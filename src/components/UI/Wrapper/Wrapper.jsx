import logo from "../../../assets/company-logo.png";
import NavBar from "../NavBar/NavBar";
import classes from "./Wrapper.module.css";

const Wrapper = () => {
  return (
      <div className={classes.header}>
        <div class="pgSize">
          <img src={logo} alt="logo" class="logoMain" />
          <NavBar/>
        </div>
      </div>
  );
};

export default Wrapper;
