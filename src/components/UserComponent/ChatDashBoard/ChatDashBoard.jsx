// import QA from "./QA";
// import AllConferenceList from "./AllConferenceList";
import ChatBox from "./ChatBox";
import classes from "./Chat.module.css";

const ChatDashBoard = (props) => {
  return (
    <div className={classes.pageSize}>
      {/* <AllConferenceList /> */}
      {/* <QA /> */}
      {/* <h2>{props.cid}</h2> */}
      <ChatBox cid={props.cid} id={props.id} />
    </div>
  );
};

export default ChatDashBoard;
