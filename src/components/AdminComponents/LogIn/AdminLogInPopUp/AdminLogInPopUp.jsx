import Button from "../../../UI/Button/Button";
import Modal from "../../../UI/Modal/Modal"
import classes from "./AdminLogInPopUp.module.css";

const AdminLogInPopUp = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h2 className={classes.txt}>
        Please login using your ActiveDirectory credentials.
      </h2>
      <div className={classes.action}>
        <Button onClick={props.onClick}>Close</Button>
      </div>
    </Modal>
  );
};

export default AdminLogInPopUp;
