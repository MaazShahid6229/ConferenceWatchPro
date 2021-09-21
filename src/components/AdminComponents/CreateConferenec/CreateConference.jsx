import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./CreateConference.module.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import DetailConference from "./DetailConference";

const CreateConference = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (data) => {
    setShowForm(true);
    setResult(JSON.stringify(data));
    console.log(result);
  };

  return (
    <Card className={classes.login}>
      <h2>Enter Id and Date and Find Order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
        <div className={classes.control}>
          <label>Conference Id</label>
          <input
            {...register("ConferenceId")}
            type="text"
            placeholder="Enter Conference Id"
            required
          />
        </div>
        <div className={classes.control}>
          <label>Date</label>
          <input {...register("Date")} type="date" required />
        </div>
        <div className={classes.actions}>
            <Button type="submit">Find Order</Button>
        </div>
      </form>
      {showForm && <DetailConference/>}
    </Card>
  );
};

export default CreateConference;
