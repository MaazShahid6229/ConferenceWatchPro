import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./CreateConference.module.css";

import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateConference = (props) => {

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  
  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    console.log(result);
  };

  return (
    <Card className={classes.login}>
      <h2>Enter Id and Find</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.controls}>
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
            <input
              {...register("Date")}
              type="date"
              required
            />
          </div>
    
        </div>
        <div className={classes.actions}>
          <Button type="submit">Find</Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateConference;
