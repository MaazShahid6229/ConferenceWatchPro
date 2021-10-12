import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Card from "../../../UI/Card/Card";
import classes from "./AdminLogInform.module.css";
import Button from "../../../UI/Button/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import BaseUrl from "../../../BaseUrl";

const LogInForm = (props) => {
  const UserLogin = BaseUrl.url + "core/user_profile/admin_login/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { push } = useHistory();

  const onSubmit = (data) => {
    axios
      .post(UserLogin, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        if (response.data.Token && response.data.Role === "A") {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              Token: response.data.Token,
            })
          );
          push("/connexadmin/home");
        }
      })
      .catch((error) => {
        let message = error.response.data.Message
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
            <label>Username</label>
            <input
              {...register("username", {
                required: { value: true, message: "This Field is Required" },
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
            <label>Password</label>
            <input
              {...register("password", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Password Cannot Exceed 20 Characters ",
                },
              })}
              type="password"
              placeholder="Enter Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
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
