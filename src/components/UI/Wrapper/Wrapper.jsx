import logo from "../../../assets/company-logo.png";
import NavBar from "../NavBar/NavBar";
import classes from "./Wrapper.module.css";

const Wrapper = () => {
  return (
      <div className={classes.header}>
        <div className={classes.pgSize}>
          <img src={logo} alt="logo" className={classes.logoMain}/>
          <NavBar/>
        </div>
      </div>
  );
};

export default Wrapper;
