import QA from "./QA";
import ChatBox from "./ChatBox";
import AllConferenceList from "./AllConferenceList";
import classes from "./ChatDashBoard.module.css";

const ChatDashBoard = () => {
  return (
    <div className={classes.pageSize}>
      <AllConferenceList />
      <QA />
      <ChatBox />
    </div>
  );
};

export default ChatDashBoard;
