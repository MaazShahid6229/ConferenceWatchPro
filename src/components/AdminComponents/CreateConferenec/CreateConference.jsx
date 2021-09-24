import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./CreateConference.module.css";
import BaseUrl from "../../BaseUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import DetailConference from "./DetailConference";

const baseURL = BaseUrl.url + "connex/conferenece/find_conference/";

const CreateConference = (props) => {
  const [result, setResult] = useState({});
  const [find, setFind] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(baseURL, {
        dash_cid: data.ConferenceId,
      })
      .then((response) => {
        setResult({
          ConferenceId: data.ConferenceId,
          Company: response.data.Conference.company_field,
          Moderator: response.data.Conference.dash_moderator_name,
          StartDate: response.data.Conference.start_date,
          EndDate: response.data.Conference.end_date,
          Series: response.data.Conference.series,
          Branding: response.data.Conference.brand,
          Password: response.data.Conference.password,
          ConfirmPassword: response.data.Conference.password,
        });
        setFind(true);
      })
      .catch((error) => {
        setResult({
          ConferenceId: data.ConferenceId,
          Company: "",
          Moderator: "",
          StartDate: "",
          EndDate: "",
          Series: "",
          Branding: "",
          Password: "",
          ConfirmPassword: "",
        });
        setFind(false);
        toast.error("No Record Found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setShowForm(true);
  };

  return (
    <Card className={classes.login}>
      <h2>Enter Id and Date and Find Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
        <div className={classes.control}>
          <label>Conference Id</label>
          <input
            {...register("ConferenceId", {
              required: { value: true, message: "This Field is Required" },
              maxLength: {
                value: 20,
                message: "Conference Id Cannot Exceed 20 Characters ",
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: "Small Alphabetical and Numbers Characters only",
              },
            })}
            type="text"
            placeholder="Enter Conference Id"
          />
          {errors.ConferenceId && <p>{errors.ConferenceId.message}</p>}
        </div>
        <div className={classes.control}>
          <label>Date</label>
          <input {...register("Date")} type="date" />
        </div>
        <div className={classes.actions}>
          <Button type="submit">Find Order</Button>
        </div>
      </form>
      {showForm && <DetailConference defaultV={result} find={find} />}
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
    </Card>
  );
};

export default CreateConference;
