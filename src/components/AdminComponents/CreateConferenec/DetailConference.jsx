import classes from "./DetailConference.module.css";
import Button from "../../UI/Button/Button";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";

const DetailConference = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");

  const brands = ["maaz", "ali", "ahmed"];

  const Branding = brands.map((brand, index) => (
    <option key={index} value={brand}>
      {brand}
    </option>
  ));

  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    console.log(result);
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
              {...register("ConferenceId")}
              type="text"
              placeholder="CID"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Company</label>
            <input
              {...register("Company")}
              type="text"
              placeholder="Enter Company"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Moderator</label>
            <input
              {...register("Moderator")}
              type="text"
              placeholder="Moderator "
              required
            />
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Start Date</label>
            <input {...register("StartDate")} type="date" required />
          </div>
          <div className={classes.control}>
            <label>End Date</label>
            <input {...register("EndDate")} type="date" required />
          </div>

          <div className={classes.control}>
            <label>Series</label>
            <input
              {...register("Series")}
              type="number"
              placeholder="Enter Series Number"
              min="0"
              step="1"
              required
            />
          </div>
        </div>
        <div className={classes.controls2}>
          <div className={classes.control}>
            <label htmlFor="Branding">Branding</label>
            <select {...register("Branding")} name="Branding">
              <option value="None">None</option>
              {Branding}
              <option value="audi">Add New</option>
            </select>
          </div>
          <div className={classes.control}>
            <label>Password</label>
            <input
              {...register("Passwords")}
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Confirm Password</label>
            <input
              {...register("ConfirmPasswords")}
              type="password"
              placeholder="Enter Again Password"
              required
            />
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
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email2">Email 2</label>
            <input
              {...register("Email2")}
              type="email2"
              placeholder="Enter Second Participant Email"
              name="email2"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email3">Email 3</label>
            <input
              {...register("Email3")}
              type="email"
              placeholder="Enter Third Participant Email"
              name="email3"
              required
            />
          </div>
        </div>
        <div className={classes.section2}>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default DetailConference;
