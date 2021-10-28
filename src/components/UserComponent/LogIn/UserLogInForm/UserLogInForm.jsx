import Card from "../../../UI/Card/Card";
import classes from "./UserLogInform.module.css";
import Button from "../../../UI/Button/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {useState} from "react"
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const LogInForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useHistory();


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    console.log(data);
    push("/dashboard");
  };

  return (
    <Card className={classes.login}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label>Username</label>
            <input
              {...register("username", {
                required: { value: true, message: "Username is Required" },
                maxLength: {
                  value: 20,
                  message: "Value Cannot Exceed 20 Characters ",
                },
              })}
              type="text"
              placeholder="Enter Your username"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className={classes.control}>
            <label>Email</label>
            <input
              {...register("email", {
                required: { value: true, message: "Email is Required" },
                maxLength: {
                  value: 30,
                  message: "Value Cannot Exceed 30 Characters ",
                },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email Format abc@gmail.com",
                },
              })}
              type="text"
              placeholder="Enter Your Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
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
            <label>Password</label>
            <i className={classes.passwordIcon}>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </i>
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
                  message: "Password Format Abc@123",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />
            {errors.Password && <p>{errors.Password.message}</p>}
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
