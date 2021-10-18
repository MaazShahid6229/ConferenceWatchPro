import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import classes from "./AdminConference.module.css";
import closeIcon from "../../../assets/close.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import { ToastContainer, toast } from "react-toastify";
import BaseUrl from "../../BaseUrl";
import deleteIcon from "../../../assets/deleteIcon.png";
import AddIcon from "../../../assets/add.png";

import axios from "axios";

const AdminConference = (props) => {
  const [inputList, setInputList] = useState([
    { s_conf_id: "", bridge_number: "" },
  ]);

  const create_bridge = BaseUrl.url + "connex/spectel/create_Spectel_Conf/";

  const { setStartConference } = useContext(closePopUpContext);

  const PopUpCloseHandler = () => {
    setStartConference(false);
  };

  const option = [
    {
      id: 0,
      text: "Harvey",
    },
    {
      id: 1,
      text: "Grace",
    },
    {
      id: 3,
      text: "Oscar",
    },
    {
      id: 4,
      text: "Isabel",
    },
    {
      id: 5,
      text: "Victor",
    },
    {
      id: 6,
      text: "Pearl",
    },
    {
      id: 7,
      text: "Atlas",
    },
    {
      id: 8,
      text: "Xena",
    },
    {
      id: 9,
      text: "Zeus",
    },
  ];

  const options = option.map((option, index) => (
    <option key={index} value={option.id}>
      {option.text}
    </option>
  ));

  const onSubmit = () => {

    for (let i=0; i<inputList.length; i++) {
      inputList[i]["conference"] = props.id;
    }

    setStartConference(false);

    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data1 = JSON.stringify(inputList)

    console.log(data1)
    
    axios
      .post(create_bridge, data1, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      })
      .then((response) => {
        setStartConference(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
        // let message = error.response.data.error;
        // toast.error(`${message}`, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { s_conf_id: "", bridge_number: "" }]);
  };

  return (
    <Fragment>
      <Modal>
        <br />
        <div className={classes.divCloseIcon}>
          <img
            onClick={PopUpCloseHandler}
            className={classes.closeIcon}
            src={closeIcon}
            alt="Close Icon"
          />
        </div>
        <form onSubmit={onSubmit} className={classes.find_form}>
          {inputList.map((x, i) => {
            return (
              <Fragment key={i}>
                <div className={classes.controls}>
                  <div className={classes.control}>
                    <label>Spectel Id</label>
                    <input
                      name="s_conf_id"
                      placeholder="Enter First Name"
                      value={x.s_conf_id}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                  </div>
                  <div className={classes.control}>
                    <label>Spectel Bridge</label>
                    <select
                      name="bridge_number"
                      placeholder="Enter First Name"
                      value={x.bridge_number}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    >
                      <option value="" disabled>
                        Chose Bridge
                      </option>
                      {options}
                    </select>
                  </div>
                </div>
                <div className={classes.iconDiv}>
                  {inputList.length !== 1 && (
                    <img
                      src={deleteIcon}
                      alt="DeleteIcon"
                      className={classes.Icon}
                      onClick={() => handleRemoveClick(i)}
                    />
                  )}
                  {inputList.length - 1 === i && inputList.length < 11 && (
                    <img
                      src={AddIcon}
                      alt="AddIcon"
                      className={classes.Icon}
                      onClick={handleAddClick}
                    />
                  )}
                </div>
              </Fragment>
            );
          })}

          <div className={classes.section2}>
            <Button
              onClick={PopUpCloseHandler}
              className={classes.action_close}
              type="button"
            >
              Close
            </Button>
            <Button className={classes.action} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AdminConference;
