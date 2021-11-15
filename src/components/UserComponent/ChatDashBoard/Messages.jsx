import React, { useEffect, useState, useRef } from "react";
import BaseUrl from "../../BaseUrl";
import axios from "axios";

import classes from "./Chat.module.css";

function Messages(props) {
  // console.log("Message");
  const store = JSON.parse(localStorage.getItem("login"));
  const token = store.Token;
  const username = store.username;
  // const user_email = store.email;

  const [list, setList] = useState([]);
  const [typing, setTyping] = useState(false);

  const get_message =
    BaseUrl.url + `chat/conf_chat/post_message/?conference_id=${props.id}`;

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
    axios
      .get(get_message, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        let objLits = [];
        let obj = response.data.Messages;
        for (let i in obj) {
          let data1 = {
            username: obj[i].name,
            message: obj[i].msg,
            time: obj[i].created_date,
            recipient: obj[i].recipient,
          };
          objLits.push(data1);
        }
        // console.log(objLits);
        setList(objLits);
      });
  }, [get_message, token]);

  useEffect(() => {
    props.socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.message["typing"]) {
        setTyping(data.message.username);
      }
      if (!data.message["typing"]) {
        setList((list) => [...list, data.message]);
        setTyping(false);
      }
    };
  }, [props.socket]);

  return (
    <div className={classes.chatInfo}>
      {list.map((message, index) => (
        <div key={index}>
          {message.username !== username && (
            <div>
              {(message.recipient === username ||
                message.recipient === "everyone" ||
                message.recipient === null) && (
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
      <div>{typing && <span>{typing} is typing</span>}</div>
    </div>
  );
}

export default Messages;
