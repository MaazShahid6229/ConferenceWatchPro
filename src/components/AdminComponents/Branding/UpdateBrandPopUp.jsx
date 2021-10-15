import React, { Fragment, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import classes from "./UpdateBrandPopUp.module.css";
import closeIcon from "../../../assets/close.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import { ToastContainer, toast } from "react-toastify";
import BaseUrl from "../../BaseUrl";

import axios from "axios";

const UpdateBrandPopUp = ({ value1 }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const update_brand = BaseUrl.url + "connex/branding/update_brand/";

  const { setUpdateBrandPopUp } = useContext(closePopUpContext);

  useEffect(() => {
    setValue("BrandName", value1?.BrandName);
    // setValue("image", value1.Image);
  }, []);

  const PopUpCloseHandler = () => {
    setUpdateBrandPopUp(false);
  };

  const onSubmit = (data) => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data1 = new FormData();

    let getImage = getValues("Image")
    if(Object.keys(getImage).length > 0)
    {
      data1.append("image", data.Image[0]);
    }
    data1.append("brand_id", value1.id);
    data1.append("text", data.BrandName);
    data1.append("is_active", true);

    axios
      .put(update_brand, data1, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      })
      .then((response) => {
        setUpdateBrandPopUp(false);
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
        <div className={classes.BrandImageDiv}>
          <img
            className={classes.BrandImage}
            src={`${BaseUrl.url}${value1.Image}`}
            width={130}
            height={120}
            alt="Brand"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label>Brand Image</label>
              <input
                {...register("Image")}
                id="fraz"
                type="file"
                accept="image/*"
                placeholder="Image"
                readOnly
              />
              {errors.Image && <p>{errors.Image.message}</p>}
            </div>

            <div className={classes.control}>
              <label>Brand Name</label>
              <input
                name="BrandName"
                {...register("BrandName", {
                  required: { value: true, message: "Brand Name Required" },
                  maxLength: {
                    value: 20,
                    message: "Brand Name Cannot Exceed 20 Characters ",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Alphabetical Characters only",
                  },
                })}
                type="text"
                placeholder="Enter Brand Name"
              />
              {errors.BrandName && <p>{errors.BrandName.message}</p>}
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

export default UpdateBrandPopUp;
