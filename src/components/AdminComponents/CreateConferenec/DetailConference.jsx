import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./DetailConference.module.css";
import Button from "../../UI/Button/Button";
import closeIcon from "../../../assets/close.png";

import BaseUrl from "../../BaseUrl";
import { generate } from "generate-password";

const all_brands = BaseUrl.url + "connex/branding/update_brand/";
const baseURL1 = BaseUrl.url + "connex/conferenece/create_conference/";
const baseURL2 = BaseUrl.url + "connex/conferenece/update_conference/";

const DetailConference = (props) => {
  console.log(props.closeHandle);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [brand, setBrand] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useHistory();

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    axios.get(all_brands).then((response) => {
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
  }, [props.defaultV, setValue]);
  const generatePassword = () => {
    var generator = require("generate-password");

    var password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
    });
    setValue("Password", password);
  };

  const handleClickShowPassword=()=>{
    setShowPassword(!showPassword);

  }

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
          push("/connexadmin/home");
        });
    } else {
      axios
        .put(baseURL2, {
          conference_id: props.defaultV.id,
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
          push("/connexadmin/create");
          push("/connexadmin/home");
        });
    }
  };

  return (
    <Fragment>
      <br />
      {props.popUp && (
        <div className={classes.divCloseIcon}>
          <img
            onClick={props.closeHandle}
            className={classes.closeIcon}
            src={closeIcon}
            alt="Close Icon"
          />
        </div>
      )}
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
            </select>
          </div>
          <div className={classes.control}>
            <label>Password</label>
            <input
              {...register("Password", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 15,
                  message: "Password Cannot Exceed 15 Characters ",
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                  message: "Password Format A-Z,a-z,0-9,@#$",
                },
              })}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter Password"
            />
            {errors.Password && <p>{errors.Password.message}</p>}
          </div>
          <div className={classes.control}>
            <Button
              className={classes.generatePassword}
              onClick={generatePassword}
            >
              Generate
            </Button>
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
          <Button
            onClick={props.closeHandle}
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
    </Fragment>
  );
};

export default DetailConference;
