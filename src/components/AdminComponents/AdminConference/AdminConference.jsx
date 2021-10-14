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

  const {  setStartConference } = useContext(closePopUpContext);

  const PopUpCloseHandler = () => {
    setStartConference(false);
  };

  const option = [
    {
      text: "Harvey",
    },
    {
      text: "Grace",
    },
    {
      text: "Oscar",
    },
    {
      text: "Isabel",
    },
    {
      text: "Victor",
    },
    {
      text: "Pearl",
    },
    {
      text: "Atlas",
    },
    {
      text: "Xena",
    },
    {
      text: "Zeus",
    },
  ];

  const options = option.map((option, index) => (
    <option key={index} value={option.text}>
      {option.text}
    </option>
  ));

  const onSubmit = (data) => {
    console.log(data);
    setStartConference(false)

    // let store = JSON.parse(localStorage.getItem("login"));
    // let token = store.Token;

    // var data1 = new FormData();

    // data1.append("image", data.Image[0]);

    // axios
    //   .post(create_brand, data1, {
    //     headers: {
    //       Authorization: `jwt ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setStartConference(false);
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     let message = error.response.data.error;
    //     toast.error(`${message}`, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   });
  };

  return (
    <Fragment>
      <Modal>
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
              <select
                name="Spectel_Bridge_1"
                {...register("Spectel_Bridge_1", {
                  required: {
                    value: true,
                    message: "Spectel Bridge is Required",
                  },
                })}
              >
                {options}
              </select>
              {errors.Spectel_Bridge_1 && (
                <p>{errors.Spectel_Bridge_1.message}</p>
              )}
            </div>
          </div>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label>Spectel Id</label>
              <input
                {...register("Spectel_Id_2", {
                  required: { value: true, message: "Spectel Id is Required" },
                })}
                type="text"
                placeholder="Spectel Id"
              />
              {errors.Spectel_Id_2 && <p>{errors.Spectel_Id_2.message}</p>}
            </div>
            <div className={classes.control}>
              <label>Spectel Bridge</label>
              <select
                name="Spectel_Bridge_2"
                {...register("Spectel_Bridge_2", {
                  required: {
                    value: true,
                    message: "Spectel Bridge is Required",
                  },
                })}
              >
                {options}
              </select>
              {errors.Spectel_Bridge_2 && (
                <p>{errors.Spectel_Bridge_2.message}</p>
              )}
            </div>
          </div>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label>Spectel Id</label>
              <input
                {...register("Spectel_Id_3", {
                  required: { value: true, message: "Spectel Id is Required" },
                })}
                type="text"
                placeholder="Spectel Id"
              />
              {errors.Spectel_Id_3 && <p>{errors.Spectel_Id_3.message}</p>}
            </div>
            <div className={classes.control}>
              <label>Spectel Bridge</label>
              <select
                name="Spectel_Bridge_3"
                {...register("Spectel_Bridge_3", {
                  required: {
                    value: true,
                    message: "Spectel Bridge is Required",
                  },
                })}
              >
                {options}
              </select>
              {errors.Spectel_Bridge_3 && (
                <p>{errors.Spectel_Bridge_3.message}</p>
              )}
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
