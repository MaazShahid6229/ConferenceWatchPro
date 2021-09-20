import Button from "../../../UI/Button/Button";
import Modal from "../../../UI/Modal/Modal";
import classes from "./LogInPopUp.module.css";

const LogInPopUp = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h3 className={classes.txt}>
        If you need help, please call the Moderator/Speaker Dial In Number or
        Communications Line listed on your confirmation or press *0 during your
        conference.
      </h3>
      <div className={classes.action}>
        <Button  onClick={props.onClick}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default LogInPopUp;
