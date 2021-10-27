import React, { Fragment } from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import classes from "./DeletePopUp.module.css";
import { Helmet } from "react-helmet";

const DeletePopUp = (props) => {
  return (
    <Fragment>
      <Helmet>
        <title>Delete Conference</title>
      </Helmet>
      <Modal>
        <h2 className={classes.txt}>
          Do you want to delete the conference{" "}
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
    </Fragment>
  );
};

export default DeletePopUp;
