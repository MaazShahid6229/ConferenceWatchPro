import Card from "../../../UI/Card/Card";
import classes from "./UserLogInform.module.css";
import Button from "../../../UI/Button/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import BaseUrl from "../../../BaseUrl";

const LogInForm = (props) => {
  const UserLogin = BaseUrl.url + "core/user_profile/user_login/";

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
    axios
      .post(UserLogin, {
        email: data.email,
        password: data.Password,
      })
      .then(async (response) => {
        if (response.data.Token && response.data.Role === "U") {
          await localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              email: data.email,
              Token: response.data.Token,
              Role: response.data.Role,
            })
          );
          push("/home");
        }
      })
      .catch((error) => {
        let message = error.response?.data.Message;
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
  };

  return (
    <Card className={classes.login}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.controls}>
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
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Email Format abc@gmail.com",
                },
              })}
              type="text"
              placeholder="Enter Your Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
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
                  message: "Password Format Abc@123",
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
        </div>
        <div className={classes.actions}>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
      <h3 className={classes.pointer} onClick={props.onClick}>
        Having Trouble Signing In?
      </h3>
      <ToastContainer
        position="top-center"
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

export default LogInForm;
