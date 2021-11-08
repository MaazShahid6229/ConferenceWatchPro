import classes from "./ChatBox.module.css";
import printer from "../../../assets/printer.png";
import chat from "../../../assets/chat.png";
import img1 from "../../../assets/img1.png";
import chat_icon from "../../../assets/chat-icon.png";
import BaseUrl from "../../BaseUrl";
import Messages from "./Messages";
import NewMessage from "./InputMessage";
import { useState, useEffect } from "react";
import axios from "axios";

const ChatBox = (props) => {
  console.log("Chatbox");

  const chat_part = BaseUrl.url + "conf_chat/chat_participants/?id=62";

  const [ws, setWs] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("ChatBox Effect");

    const newSocket = new WebSocket(
      "ws://" + BaseUrl.chat + "/ws/chat/" + props.cid + "/"
    );

    // console.log(newSocket);

    setSocket(newSocket);

    newSocket.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 10 second.",
        e.reason
      );

      setTimeout(() => {
        console.log("connecting.... cHatBox");
        setWs(e);
      }, 10000);
    };

    newSocket.onerror = function (err) {
      console.error("errror");
      newSocket.close();
    };
  }, [props.cid, ws]);

  useEffect(() => {
    console.log("api hit");
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    axios
      .get(chat_part, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      });
  }, [chat_part]);

  return (
    <div className={classes.messageForm}>
      <div className={classes.chatTxt}>
        <img src={chat} alt="Chat" />
        <h2>{props.cid}</h2>
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
        {socket ? (
          <div>
            <hr className={classes.box}></hr>
            <Messages socket={socket} />
            <NewMessage socket={socket} id={props.id} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
};
export default ChatBox;
