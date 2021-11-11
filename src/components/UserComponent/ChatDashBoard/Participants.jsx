import React from "react";
import classes from "./Chat.module.css";
import headImg from "../../../assets/participants.png";
import setting from "../../../assets/setting.png";
import img1 from "../../../assets/img1.png";
import printer from "../../../assets/printer.png";
import downward from "../../../assets/downward-arrow.png";
import userIcon from "../../../assets/user-icon.png";

const Participants = () => {
  return (
    <div className={classes.backgroundClr}>
      <div className={classes.headPadding}>
        <div className={classes.tableHead}>
          <img class="headImg" src={headImg} alt="Participants" />
          <h2>Participants</h2>
        </div>
        <div className={`${classes.tableHead} ${classes.searchimg}`}>
          <form className={classes.searchBar}>
            <input type="search" placeholder="Search.." name="search" />
          </form>
          <button type="button">
            <img src={setting} alt="setting" />
          </button>
          <button type="button">
            <img src={img1} alt="Image1" />
          </button>
          <button type="button">
            <img src={printer} alt="Printer" />
          </button>
          <button type="button">
            <img class="arrow" src={downward} alt="Downward Arrow" />
          </button>
        </div>
      </div>
      <table>
        <tr>
          <th>Mute</th>
          <th>
            User
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Name
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Company
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Phone
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Field 1
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Field 2
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
          <th>
            Field 3
            <button type="button">
              <img src={userIcon} alt="Icon" />
            </button>
          </th>
        </tr>
      </table>
      <table>
        <tr>
          <td>There are no Participants.</td>
        </tr>
      </table>
    </div>
  );
};
export default Participants;
