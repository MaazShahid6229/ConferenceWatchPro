import QA from "./QA";
import Participants from "./Participants";
import ChatBox from "./ChatBox";
import classes from "./Chat.module.css";

const ChatDashBoard = (props) => {
  return (
    <div className={`${classes.pageSize} ${classes.mainPadding}`}>
      <div className={classes.formTable}>
        <QA />
        <Participants />
      </div>
      <ChatBox cid={props.cid} id={props.id} />
    </div>
  );
};

export default ChatDashBoard;
