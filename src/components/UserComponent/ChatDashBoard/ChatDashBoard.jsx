// import QA from "./QA";
// import AllConferenceList from "./AllConferenceList";
import ChatBox from "./ChatBox";
import classes from "./ChatDashBoard.module.css";

const ChatDashBoard = (props) => {
  return (
    <div className={classes.pageSize}>
      {/* <AllConferenceList /> */}
      {/* <QA /> */}
      {/* <h2>{props.cid}</h2> */}
      <ChatBox />
    </div>
  );
};

export default ChatDashBoard;
