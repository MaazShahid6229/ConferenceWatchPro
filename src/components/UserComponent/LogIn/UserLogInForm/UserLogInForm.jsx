import Card from "../../../UI/Card/Card";
import classes from "./UserLogInform.module.css";
import Button from "../../../UI/Button/Button";
import { useForm } from "react-hook-form";
// import { useState } from "react";

const LogInForm = (props) => {
  const { register, handleSubmit } = useForm();
  // const [result, setResult] = useState("");
  const onSubmit = (data) => {
    // console.log(data)
  };

  return (
    <Card className={classes.login}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Name</label>
            <input
              {...register("Name")}
              type="text"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Email</label>
            <input
              {...register("Email")}
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className={classes.control}>
            <label>Conference Id</label>
            <input
              {...register("Conference Id")}
              type="text"
              placeholder="Enter Your Conference Id"
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
          <Button type="submit">Sign In</Button>
        </div>
      </form>
      <h3 className={classes.pointer} onClick={props.onClick}>
        Having Trouble Signing In?
      </h3>
    </Card>
  );
};

export default LogInForm;
