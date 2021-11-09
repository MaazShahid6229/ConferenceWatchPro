import { useForm } from "react-hook-form";
import classes from "./ChatBox.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../BaseUrl";

const NewMessage = (props) => {
  console.log("input_messgae");
  const chat_part =
    BaseUrl.url + `chat/conf_chat/chat_participants/?id=${props.id}`;

  const post_message = BaseUrl.url + "chat/conf_chat/post_message/";

  const store = JSON.parse(localStorage.getItem("login"));
  const token = store.Token;
  const username = store.username;
  const user_email = store.email;

  const { register, handleSubmit, setValue } = useForm();
  const [participants, setParticipants] = useState([]);

  const messageForm = (data) => {
    const message = data.message;
    props.socket.send(
      JSON.stringify({
        message: {
          username: username,
          message: message,
          time: new Date().toLocaleTimeString(),
          sender_email: user_email,
          receiver_email: data.participant,
        },
      })
    );
    if (data.participant === "everyone") {
      var data1 = {
        name: user_email,
        msg: message,
        conference: props.id,
      };
    } else {
      data1 = {
        name: user_email,
        msg: message,
        conference: props.id,
        recipient: data.participant,
      };
    }
    axios
      .post(post_message, data1, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      });

    setValue("message", "");
  };

  useEffect(() => {
    axios
      .get(chat_part, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        const obj = response.data["user emails"];
        console.log(obj);
        setParticipants(obj);
      });
  }, [chat_part, token]);

  const participant = participants.map((part, index) => (
    <option key={index} value={part.email_address}>
      {part.email_address}
    </option>
  ));

  return (
    <div className={classes.chatbox}>
      <form onSubmit={handleSubmit(messageForm)}>
        <input
          {...register("message", {
            required: { value: true, message: "message is Required" },
            maxLength: {
              value: 300,
              message: "Value Cannot Exceed 300 Characters ",
            },
          })}
          type="text"
          placeholder="Enter Your Message"
        />
        <input type="submit" value="SEND" />
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
    </div>
  );
};

export default NewMessage;
