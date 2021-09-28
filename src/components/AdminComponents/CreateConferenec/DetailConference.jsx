import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./DetailConference.module.css";
import Button from "../../UI/Button/Button";

import BaseUrl from "../../BaseUrl";

const baseURL = BaseUrl.url + "connex/branding/update_brand/";
const baseURL1 = BaseUrl.url + "connex/conferenece/create_conference/";

const DetailConference = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [brand, setBrand] = useState([]);
  const { push } = useHistory();

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const obj = response.data["All Brand"];
      let brands = [];
      for (const i in obj) {
        brands.push(obj[i]);
      }
      setBrand(brands);
    });
  }, [props.defaultV]);

  const Branding = brand.map((brand, index) => (
    <option key={index} value={brand.id}>
      {brand.text}
    </option>
  ));

  useEffect(() => {
    for (const key in props.defaultV) {
      setValue(key, props.defaultV[key]);
    }
  }, [props.defaultV]);

  const AddBrand = () => {
    console.log("Add Brand");
  };

  const onSubmit = (data) => {
    if (!props.find) {
      axios
        .post(baseURL1, {
          dash_cid: data.ConferenceId,
          dash_company_name: data.Company,
          dash_moderator_name: data.Moderator,
          start_date: data.StartDate,
          end_date: data.EndDate,
          series: data.Series,
          brand: data.Branding,
          password: data.Password,
          email_addresses: [],
        })
        .then((response) => {
          toast.success(response.data.Message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          push("/connexadmin/create");
        });
    }
  };

  return (
    <Fragment>
      <br />
      <hr></hr>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>CID</label>
            <input
              {...register("ConferenceId", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Conference Id Cannot Exceed 20 Characters ",
                },
              })}
              type="text"
              placeholder="CID"
              readOnly
            />
            {errors.ConferenceId && <p>{errors.ConferenceId.message}</p>}
          </div>

          <div className={classes.control}>
            <label>Company</label>
            <input
              {...register("Company", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 50,
                  message: "Company Name Cannot Exceed 50 Characters ",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Alphabetical Characters only",
                },
              })}
              type="text"
              placeholder="Enter Company"
            />
            {errors.Company && <p>{errors.Company.message}</p>}
          </div>
          <div className={classes.control}>
            <label>Moderator</label>
            <input
              {...register("Moderator", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Conference Id Cannot Exceed 20 Characters ",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Alphabetical Characters only",
                },
              })}
              type="text"
              placeholder="Moderator "
            />
            {errors.Moderator && <p>{errors.Moderator.message}</p>}
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Start Date</label>
            <input
              {...register("StartDate")}
              type="date"
              min={`${!props.find && disablePastDate()}`}
            />
          </div>
          <div className={classes.control}>
            <label>End Date</label>
            <input
              {...register("EndDate")}
              type="date"
              min={`${!props.find && disablePastDate()}`}
            />
          </div>

          <div className={classes.control}>
            <label>Series</label>
            <input
              {...register("Series")}
              type="number"
              placeholder="Enter Series Number"
              min="0"
              step="1"
            />
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="Branding">Branding</label>
            <select name="Branding" {...register("Branding")}>
              <option value="" disabled>
                Chose Brand
              </option>
              {Branding}
              {/* <option>
                <div onClick={AddBrand}>Add New</div>
              </option> */}
            </select>
          </div>
          <div className={classes.control}>
            <label>Password</label>
            <input
              {...register("Password", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Password Cannot Exceed 20 Characters ",
                },
              })}
              type="password"
              placeholder="Enter Password"
            />
            {errors.Password && <p>{errors.Password.message}</p>}
          </div>
          <div className={classes.control}>
            <label>Confirm Password</label>
            <input
              {...register("ConfirmPassword", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Password Cannot Exceed 20 Characters ",
                },
              })}
              type="password"
              placeholder="Enter Again Password"
            />
            {errors.ConfirmPassword && <p>{errors.ConfirmPassword.message}</p>}
          </div>
        </div>
        <div className={classes.controls3}>
          <div className={classes.control}>
            <label htmlFor="email1">Email 1</label>
            <input
              {...register("Email1")}
              type="email"
              placeholder="Enter First Participant Email"
              name="email1"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email2">Email 2</label>
            <input
              {...register("Email2")}
              type="email2"
              placeholder="Enter Second Participant Email"
              name="email2"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email3">Email 3</label>
            <input
              {...register("Email3")}
              type="email"
              placeholder="Enter Third Participant Email"
              name="email3"
            />
          </div>
        </div>
        <div className={classes.section2}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <ToastContainer
        position="top-left"
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

export default DetailConference;
