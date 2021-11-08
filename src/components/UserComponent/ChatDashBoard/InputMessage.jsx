import { useForm } from "react-hook-form";
import classes from "./ChatBox.module.css";

const NewMessage = (props) => {
  const { register, handleSubmit, setValue } = useForm();

  const messageForm = (data) => {
    const message = data.message;
    props.socket.send(
      JSON.stringify({
        message: { message: message, time: new Date().toLocaleTimeString() },
      })
    );
    setValue("message", "");
  };

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
        <select name="everyone">
          <option value="everyone">Everyone</option>
          <option value="everyone">Everyone</option>
          <option value="everyone">Everyone</option>
          <option value="everyone">Everyone</option>
        </select>
      </form>
    </div>
  );
};

export default NewMessage;
