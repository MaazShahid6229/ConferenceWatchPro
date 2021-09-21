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
        <div className={classes.section2}>
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
        </div>
        <div className={classes.EmailSection}>
          <div className={classes.control}>
            <label>Email 1</label>
            <input
              {...register("Email1")}
              type="password"
              placeholder="Enter First Participant Email"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Email 2</label>
            <input
              {...register("Email2")}
              type="password"
              placeholder="Enter Second Participant Email"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Email 3</label>
            <input
              {...register("Email3")}
              type="password"
              placeholder="Enter Third Participant Email"
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
