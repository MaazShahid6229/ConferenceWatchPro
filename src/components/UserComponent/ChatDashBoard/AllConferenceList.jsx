import classes from "./AllConferenceList.module.css";
import chat from "../../../assets/chat.png";
import printer from "../../../assets/printer.png";
import img1 from "../../../assets/img1.png";
import chat_icon from "../../../assets/chat-icon.png";

const AllConferenceList = () => {
  return (
    <div className={classes.messageForm}>
      <div className={classes.chatTxt}>
        <img src={chat} alt="Chat" />
        <h2>Chat</h2>
      </div>
      <div class={classes.chatimg}>
        <button type="button">
          <img src={printer} alt="Printer" />
        </button>
        <button type="button">
          <img src={img1} alt="" />
        </button>
        <button type="button">
          <img src={chat_icon} alt="chatIcon" />
        </button>
      </div>

      <div class={classes.chatbox}>
        <form>
          <hr class={classes.box}></hr>
          <textarea type="text"></textarea>
        </form>
      </div>
    </div>
  );
};
export default AllConferenceList;
