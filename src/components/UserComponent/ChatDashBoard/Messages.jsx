import React, { useEffect, useState, useRef } from "react";
import classes from "./Chat.module.css";

function Messages({ socket }) {

  const store = JSON.parse(localStorage.getItem("login"));
  // const token = store.Token;
  const username = store.username;
  const user_email = store.email;

  const [list, setList] = useState([]);

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [list]);

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
          {message.username !== username && (
            <div>
              {(message.receiver_email === user_email ||
                message.receiver_email === "everyone") && (
                <div className={classes.chatClr} ref={messageRef}>
                  <h3>{message.username}</h3>
                  <p>{message.message}</p>
                  <span>{message.time}</span>
                </div>
              )}
            </div>
          )}
          {message.username === username && (
            <div
              className={`${classes.chatLight} ${classes.chatClr}`}
              ref={messageRef}
            >
              <h3>{message.username}</h3>
              <p>{message.message}</p>
              <span>{message.time}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;
