import { useForm } from "react-hook-form";
import classes from "./Chat.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BaseUrl from "../../BaseUrl";

const NewMessage = (props) => {
  const chat_part =
    BaseUrl.url + `chat/conf_chat/chat_participants/?id=${props.id}`;

  const post_message = BaseUrl.url + "chat/conf_chat/post_message/";

  const store = JSON.parse(localStorage.getItem("login"));
  const token = store.Token;
  const username = store.username;
  // const user_email = store.email;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [participants, setParticipants] = useState([]);

  const onSubmit = (data) => {
    const message = data.message;
    props.socket.send(
      JSON.stringify({
        message: {
          username: username,
          message: message,
          time: new Date().toLocaleTimeString(),
          recipient: data.participant,
        },
      })
    );
    if (data.participant === "everyone") {
      var data1 = {
        name: username,
        msg: message,
        conference: props.id,
      };
    } else {
      data1 = {
        name: username,
        msg: message,
        conference: props.id,
        recipient: data.participant,
      };
    }
    axios
      .post(post_message, data1, {
        headers: { Authorization: `jwt ${token}` },
      })
      .catch((error) => {
        let message = error.response.data.Message;
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

    setValue("message", "");
  };

  // const typingHandler = () => {
  //   props.socket.send(
  //     JSON.stringify({
  //       message: {
  //         username: username,
  //         typing: true,
  //       },
  //     })
  //   );
  // };

  useEffect(() => {
    axios
      .get(chat_part, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        const obj = response.data["user emails"];
        setParticipants(obj);
      });
  }, [chat_part, token]);

  const participant = participants.map((part, index) => (
    <option key={index} value={part.username}>
      {part.username}
    </option>
  ));

  return (
    <div className={classes.chatbox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.chatposition}>
          <input
            {...register("message", {
              required: { value: true, message: "message is Required" },
              maxLength: {
                value: 128,
                message: "Value Cannot Exceed  Characters ",
              },
              pattern: {
                // value: /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/,
                value: /^[^\s]*(\s*[^\s]+)/,
                message: "Empty Message Not Allowed",
              },
            })}
            type="text"
            placeholder="Enter Your Message"
            autoComplete="off"
            // onChange={typingHandler}
          />
          <input type="submit" />
          {errors.message && <p>{errors.message.message}</p>}
        </div>

        <select
          name="participant"
          {...register("participant", {
            required: { value: true, message: "Brand Name is Required" },
          })}
        >
          <option value="everyone">everyone</option>
          {participant}
        </select>
      </form>
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
    </div>
  );
};

export default NewMessage;
