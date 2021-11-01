import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AddBrandPopUp from "../Branding/AddBrandPopUp";
import deleteIcon from "../../../assets/deleteIcon.png";
import AddIcon from "../../../assets/add.png";
import { ToastContainer, toast } from "react-toastify";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./DetailConference.module.css";
import Button from "../../UI/Button/Button";
import closeIcon from "../../../assets/close.png";
import BaseUrl from "../../BaseUrl";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

const all_brands = BaseUrl.url + "connex/branding/update_brand/";
const baseURL1 = BaseUrl.url + "connex/conferenece/create_conference/";
const baseURL2 = BaseUrl.url + "connex/conferenece/update_conference/";

/* eslint-disable */

const DetailConference = (props) => {
  const {
    setUpdatePopUp,
    setAddBrandPopUp,
    addBrandPopUp,
    conferenceApiCall,
    setConferenceApiCall,
  } = useContext(closePopUpContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [emailList, setEmailList] = useState([{ email_address: "" }]);

  const NewEmailList = [];
  for (let i in props.defaultV.Email) {
    NewEmailList.push({
      email_address: props.defaultV.Email[i]["email_address"],
    });
  }

  useEffect(() => {
    if (NewEmailList.length > 0) {
      setEmailList(NewEmailList);
    } else {
      setEmailList([{ email_address: "" }]);
    }
  }, [props.defaultV]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...emailList];
    list[index][name] = value;
    setEmailList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...emailList];
    list.splice(index, 1);
    setEmailList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (emailList.length >= 9) {
      toast.error("Reached at Max Limit", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setEmailList([...emailList, { Email: "" }]);
  };

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
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    axios
      .get(all_brands, { headers: { Authorization: `jwt ${token}` } })
      .then((response) => {
        const obj = response.data["All Brand"];
        let brands = [];
        for (const i in obj) {
          brands.push(obj[i]);
        }
        setBrand(brands);
      });
  }, [props.defaultV, addBrandPopUp]);

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
      strict: true,
    });
    setValue("Password", password);
    setShowPassword(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (data) => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    if (!props.find) {
      var data1 = {
        dash_cid: data.ConferenceId,
        dash_company_name: data.Company,
        dash_moderator_name: data.Moderator,
        start_date: data.StartDate,
        end_date: data.EndDate,
        series: data.Series,
        brand: data.Branding,
        password: data.Password,
        email_addresses: emailList,
      };
      axios
        .post(baseURL1, data1, {
          headers: {
            Authorization: `jwt ${token}`,
          },
        })
        .then((response) => {
          push("/connexadmin/home");
        })
        .catch((error) => {
          // let message = error.response.data.Message;
          let message = "Check Your Details Again";
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
    } else {
      var data2 = {
        conference_id: props.defaultV.id,
        dash_cid: data.ConferenceId,
        dash_company_name: data.Company,
        dash_moderator_name: data.Moderator,
        start_date: data.StartDate,
        end_date: data.EndDate,
        series: data.Series,
        brand: data.Branding,
        password: data.Password,
        email_addresses: emailList,
      };
      axios
        .put(baseURL2, data2, {
          headers: { Authorization: `jwt ${token}` },
        })
        .then((response) => {
          setUpdatePopUp(false);
          setConferenceApiCall(!conferenceApiCall);
          push("/connexadmin/home");
        })
        .catch((error) => {
          // let message = error.response.data.Message;
          let message = "Check Your Details Again";
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
    }
  };
  const AddNewBrand = () => {
    setAddBrandPopUp(true);
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
                required: { value: true, message: "Company Name Required" },
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
                required: { value: true, message: "Moderator is Required" },
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
              {...register("StartDate", {
                required: { value: true, message: "Start Date is Required" },
              })}
              type="date"
              min={`${!props.find && disablePastDate()}`}
            />
            {errors.StartDate && <p>{errors.StartDate.message}</p>}
          </div>
          <div className={classes.control}>
            <label>End Date</label>
            <input
              {...register("EndDate", {
                required: { value: true, message: "End Date is Required" },
              })}
              type="date"
              min={`${!props.find && disablePastDate()}`}
            />
            {errors.EndDate && <p>{errors.EndDate.message}</p>}
          </div>

          <div className={classes.control}>
            <label>Series</label>
            <input
              {...register("Series", {
                required: { value: true, message: "Series is Required" },
              })}
              type="number"
              placeholder="Enter Series Number"
              min="0"
              step="1"
            />
            {errors.Series && <p>{errors.Series.message}</p>}
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="Branding">Branding</label>
            <select
              name="Branding"
              {...register("Branding", {
                required: { value: true, message: "Brand Name is Required" },
              })}
            >
              <option value="" disabled>
                Chose Brand
              </option>
              {Branding}
            </select>
            {errors.Branding && <p>{errors.Branding.message}</p>}
          </div>
          <div className={classes.controls}>
            <Button className={classes.AddBrand} onClick={AddNewBrand}>
              Add New Brand
            </Button>
          </div>
          <div className={classes.control}>
            <label>Password</label>
            <input
              {...register("Password", {
                required: { value: true, message: "Password is Required" },
                maxLength: {
                  value: 15,
                  message: "Password Cannot Exceed 15 Characters ",
                },
                minLength: {
                  value: 6,
                  message: "Password at least 6 Characters ",
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/,
                  message: "Password Format A-Z,a-z,0-9,@#$",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />
            <i className={classes.passwordIcon}>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </i>
            {errors.Password && <p>{errors.Password.message}</p>}
          </div>
          {/* <IconButton/> */}
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
          {emailList.map((x, i) => {
            return (
              <Fragment key={i}>
                <div className={classes.labelForm}>
                  <div className={classes.labelInput}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email_address"
                      placeholder="Enter Participant Email"
                      value={x.email_address}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                  </div>
                  <div className={classes.iconDiv}>
                    {emailList.length !== 1 && (
                      <img
                        className={classes.Icon}
                        src={deleteIcon}
                        alt="DeleteIcon"
                        onClick={() => handleRemoveClick(i)}
                      />
                    )}
                    {emailList.length - 1 === i && emailList.length < 10 && (
                      <img
                        className={classes.Icon}
                        src={AddIcon}
                        alt="AddIcon"
                        onClick={handleAddClick}
                      />
                    )}
                  </div>
                </div>
                <hr className={classes.sepHeight} />
              </Fragment>
            );
          })}
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
      {addBrandPopUp && <AddBrandPopUp />}
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
