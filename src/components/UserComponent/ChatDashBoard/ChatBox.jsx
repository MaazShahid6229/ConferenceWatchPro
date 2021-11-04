import classes from "./ChatBox.module.css";
import printer from "../../../assets/printer.png";
import chat from "../../../assets/chat.png";
import img1 from "../../../assets/img1.png";
import chat_icon from "../../../assets/chat-icon.png";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BaseUrl from "../../BaseUrl";

const ChatBox = (props) => {
  console.log("ChatBox")
  console.log(props.cid);
  const { register, handleSubmit, setValue } = useForm();
  const [list, setList] = useState([]);
  const messageList = []

  const roomName = props.cid;
  console.log(roomName);

  const chatSocket = new WebSocket(
    "ws://" + BaseUrl.chat + "/ws/chat/" + roomName + "/"
  );

  useEffect(() => {

    console.log("chatsocket", chatSocket);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("data", data);
      setList(list=>[...list, data.message])
      // document.querySelector("#chat-log").value += data.message + "\n";
    };

    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };
  },[])

  const messageForm = (data) => {

    const message = data.message;
    chatSocket.send(
      JSON.stringify({
        message: message,
      })
    );

    console.log(messageList);
    // setList(list=>[...list, data.message])
    setValue("message", "");

  };

  return (
    <div className={classes.messageForm}>
      <div className={classes.chatTxt}>
        <img src={chat} alt="Chat" />
        <h2>Chat</h2>
      </div>
      <div className={classes.chatimg}>
        <button type="button">
          <img src={printer} alt="Printer" />
        </button>
        <button type="button">
          <img src={img1} alt="Something" />
        </button>
        <button type="button">
          <img src={chat_icon} alt="chatIcon" />
        </button>
      </div>
      <div className={classes.chatbox}>
        <form onSubmit={handleSubmit(messageForm)}>
          <hr className={classes.box}></hr>
          <div className={classes.chatBoxDiv}>
            {
              list.map((message, index) => (
                <li key={index} >
                  {message}
                </li>
              ))
            }
          </div>
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
      </div>
    </div>
  );
};
export default ChatBox;
