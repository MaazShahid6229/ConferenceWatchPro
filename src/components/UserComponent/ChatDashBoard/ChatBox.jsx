import classes from "./Chat.module.css";
import printer from "../../../assets/printer.png";
import chat from "../../../assets/chat.png";
import img1 from "../../../assets/img1.png";
import chat_icon from "../../../assets/chat-icon.png";
import connected from "../../../assets/connected.png";
import disconnected from "../../../assets/disconnected.png";
import BaseUrl from "../../BaseUrl";
import Messages from "./Messages";
import NewMessage from "./InputMessage";
import { useState, useEffect } from "react";

const ChatBox = (props) => {

  const [ws, setWs] = useState(true);
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {

    const newSocket = new WebSocket(
      "ws://" + BaseUrl.chat + "/ws/chat/" + props.cid + "/"
    );

    newSocket.onopen = function (e) {
      setOnline(true);
    };

    setSocket(newSocket);

    newSocket.onclose = function (e) {
      setOnline(false);
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );

      setTimeout(() => {
        setWs(e);
      }, 1000);
    };

    newSocket.onerror = function (err) {
      newSocket.close();
    };
    
  }, [props.cid, ws]);

  return (
    <div className={classes.messageForm}>
      <div className={classes.chatTxt}>
        <img src={chat} alt="Chat" />
        <h2>{props.cid}</h2>
        {online ? (
          <img
            src={connected}
            alt="connected"
            className={classes.connectIcon}
          />
        ) : (
          <img
            src={disconnected}
            alt="disconnected"
            className={classes.connectIcon}
          />
        )}
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
