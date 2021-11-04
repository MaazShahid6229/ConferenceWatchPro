import { useForm } from "react-hook-form";

const NewMessage = ({ socket }) => {
  const { register, handleSubmit, setValue } = useForm();

  const messageForm = (data) => {
    socket.emit("message", data.message);
    setValue("message", "");
  };

  return (
    <form onSubmit={handleSubmit(messageForm)}>
      <select name="everyone">
        <option value="everyone">Everyone</option>
      </select>
      <br />
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
    </form>
  );
};

export default NewMessage;
