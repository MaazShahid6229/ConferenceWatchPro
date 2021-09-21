import Card from "../../../UI/Card/Card";
import classes from "./AdminLogInform.module.css";
import Button from "../../../UI/Button/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogInForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    console.log(result);
  };

  return (
    <Card className={classes.login}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Username</label>
            <input
              {...register("Name")}
              type="text"
              placeholder="Enter Your username"
              required
            />
          </div>

          <div className={classes.control}>
            <label>Password</label>
            <input
              {...register("Password")}
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
        </div>
        <div className={classes.actions}>
          <Link to="/connexadmin/home">
          <Button type="submit">Sign In</Button>
          </Link>
        </div>
      </form>
      <h3 className={classes.pointer} onClick={props.onClick}>
        Having Trouble Signing In?
      </h3>
    </Card>
  );
};

export default LogInForm;
