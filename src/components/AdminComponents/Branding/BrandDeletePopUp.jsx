import React from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import classes from "./BrandDeletePopUp.module.css";

const BrandDeletePopUp = (props) => {
  return (
    <Modal>
      <h2 className={classes.txt}>
        Do you want to delete the Brand{" "}
        <strong className={classes.Conference}>{props.value}</strong>
      </h2>
      <div className={classes.action}>
        <Button className={classes.action_no} onClick={props.deleteNo}>
          No
        </Button>
        <Button className={classes.action_yes} onClick={props.deleteYes}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default BrandDeletePopUp;
