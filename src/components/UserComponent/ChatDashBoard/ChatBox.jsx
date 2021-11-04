import io from "socket.io-client";

import classes from "./ChatBox.module.css";
import printer from "../../../assets/printer.png";
import chat from "../../../assets/chat.png";
import img1 from "../../../assets/img1.png";
import chat_icon from "../../../assets/chat-icon.png";
import { useEffect, useState } from "react";
import BaseUrl from "../../BaseUrl";
import Messages from "./Messages";
import NewMessage from "./InputMessage";

const ChatBox = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      "ws://" + BaseUrl.chat + "/ws/chat/" + props.cid + "/"
    );
    newSocket.on("connect", () => {
      // either with send()
      newSocket.send("Hello!");
    });

    console.log(newSocket);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket, props.cid]);

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
        {socket ? (
          <div>
            <hr className={classes.box}></hr>
            <Messages socket={socket} />
            <NewMessage socket={socket} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}
      </div>
    </div>
  );
};
export default ChatBox;
