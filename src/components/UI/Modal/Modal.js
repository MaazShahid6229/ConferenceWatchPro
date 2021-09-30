import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverLay = (props) => {
  return (
    <div className={`${props.className ?classes.UpdateModal :classes.modal}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick}></BackDrop>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverLay className={props.className}>{props.children}</ModalOverLay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
