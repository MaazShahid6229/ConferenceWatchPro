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

  const PrintChat = (event) => {
    console.log("PrintChat");
    var divContents = document.getElementById("GFG").innerHTML;
    var a = window.open("", "", "height=600, width=600");
    a.document.write(`<html><head><link rel=stylesheet href=ChatPrint.css></head>`);
    a.document.write(
      `<body > <h1 class = "h1_tag">${props.cid} Conference have following Messages </h1><br>`
    );
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
  };

  const SaveChat = () => {
    console.log("SaveChat");
  };

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
        <button type="button" onClick={SaveChat}>
          <img src={printer} alt="Printer" />
        </button>
        <button type="button" onClick={PrintChat}>
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
            <div id="GFG">
              <Messages socket={socket} id={props.id} />
            </div>
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
