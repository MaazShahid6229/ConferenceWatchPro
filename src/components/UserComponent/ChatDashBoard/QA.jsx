import classes from "./Chat.module.css";
import QAImage from "../../../assets/q&A.png";
import setting from "../../../assets/setting.png";
import img1 from "../../../assets/img1.png";
import printer from "../../../assets/printer.png";
import downward from "../../../assets/downward-arrow.png";

const QA = () => {
  return (
    <div className={`${classes.backgroundClr} ${classes.marginBottom}`}>
      <div className={classes.headPadding}>
        <div className={classes.tableHead}>
          <img className={classes.headImg} src={QAImage} alt="Q&A" />
          <h2>Q&A</h2>
          <label className={classes.switch}>
            <input className={classes.checkbox} />
            <span className={classes["slider round"]}></span>
          </label>
        </div>
        <div className={`${classes.tableHead} ${classes.searchimg}`}>
          <form className={classes.checkBox}>
            <label>
              <input type="checkbox" defaultChecked />
              <span className={classes.checkmark}></span>Take Next Question
            </label>
          </form>
          <form className={classes.searchBar}>
            <input type="search" placeholder="Search.." name="search" />
          </form>
          <button type="button">
            <img src={setting} alt="settingImage" />
          </button>
          <button type="button">
            <img src={img1} alt="image1" />
          </button>
          <button type="button">
            <img src={printer} alt="Printer" />
          </button>
          <button type="button">
            <img
              className={classes.arrow}
              src={downward}
              alt="Downward Arrow"
            />
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mute</th>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Field 1</th>
            <th>Field 2</th>
            <th>Field 3</th>
            <th>Update Order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>There are no questions.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default QA;
