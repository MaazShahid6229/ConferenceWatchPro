import React, { useEffect, useState } from "react";
import classes from "./ChatBox.module.css";

function Messages({ socket }) {
  console.log("Message");

  const [list, setList] = useState([]);

  useEffect(() => {
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setList((list) => [...list, data.message]);
    };
  }, [socket]);

  return (
    <div className={classes.chatInfo}>
      {list.map((message, index) => (
        <div key={index}>
          <div className={classes.chatClr}>
            <h3>Maaz</h3>
            <p>{message.message}</p>
            <span>{message.time}</span>
          </div>
          <div className={`${classes.chatClr} ${classes.chatLight}`}>
            <h3>Maaz</h3>
            <p>{message.message}</p>
            <span>{message.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
