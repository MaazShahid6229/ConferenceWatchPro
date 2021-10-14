import React, { Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import classes from "./AdminConference.module.css";
import closeIcon from "../../../assets/close.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import { ToastContainer, toast } from "react-toastify";
import BaseUrl from "../../BaseUrl";

import axios from "axios";

const AdminConference = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create_brand = BaseUrl.url + "connex/branding/create_brand/";

  const { startConference,setStartConference } = useContext(closePopUpContext);

  const PopUpCloseHandler = () => {
    setStartConference(false);
  };

  const onSubmit = (data) => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data1 = new FormData();

    data1.append("image", data.Image[0]);
    data1.append("text", data.BrandName);
    data1.append("is_active", true);

    axios
      .post(create_brand, data1, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      })
      .then((response) => {
        setStartConference(false);
        console.log(response);
      })
      .catch((error) => {
        let message = error.response.data.error;
        toast.error(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Fragment>
      <Modal >
        <br />
        <div className={classes.divCloseIcon}>
          <img
            onClick={PopUpCloseHandler}
            className={classes.closeIcon}
            src={closeIcon}
            alt="Close Icon"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label>Spectel Id</label>
              <input
                {...register("Spectel_Id_1", {
                  required: { value: true, message: "Spectel Id is Required" },
                })}
                type="text"
                placeholder="Spectel Id"
              />
              {errors.Spectel_Id_1 && <p>{errors.Spectel_Id_1.message}</p>}
            </div>
            <div className={classes.control}>
              <label>Spectel Bridge</label>
              <input
                {...register("Spectel_Bridge_1", {
                  required: { value: true, message: "Spectel Bridge is Required" },
                })}
                type="text"
                placeholder="Spectel Bridge"
              />
              {errors.Spectel_Bridge_1 && <p>{errors.Spectel_Bridge_1.message}</p>}
            </div>
          </div>
          <div className={classes.section2}>
            <Button
              onClick={PopUpCloseHandler}
              className={classes.action_close}
              type="button"
            >
              Close
            </Button>
            <Button className={classes.action} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default AdminConference;
