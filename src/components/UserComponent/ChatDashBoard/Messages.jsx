import React, { useEffect, useState } from "react";
import classes from "./ChatBox.module.css";

function Messages(props) {
  console.log("Message");

  const [list, setList] = useState([]);

  // props.socket.onclose = function (e) {
  //   console.log(
  //     "Socket is closed. Reconnect will be attempted in 1 second.",
  //     e.reason
  //   );
  //   setTimeout(function () {
  //     console.log("connecting.... message");
  //     props.connect();
  //   }, 1000);
  // };

  useEffect(() => {
    props.socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setList((list) => [...list, data.message]);
    };
  }, [props.socket]);

  return (
    <div className={classes.chatBoxDiv}>
      {list.map((message, index) => (
        // <li key={index}>{message}</li>
        <div key={index} className={classes.container}>
          <h5>{message}</h5>
          <span className={classes.time_right}>11:00</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;
