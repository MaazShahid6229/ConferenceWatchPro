import React, { Fragment, useContext, useState, useEffect } from "react";
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
  const get_bridge =
    BaseUrl.url + `connex/spectel/create_Spectel_Conf/?id=${props.id}`;

  const { setStartConference } = useContext(closePopUpContext);

  const PopUpCloseHandler = () => {
    setStartConference(false);
  };

  const option = [
    {
      id: 0,
      text: "Grace",
    },
    {
      id: 1,
      text: "Harvey",
    },
    {
      id: 2,
      text: "Isabel",
    },
    {
      id: 3,
      text: "Oscar",
    },
    {
      id: 4,
      text: "Pearl",
    },
    {
      id: 5,
      text: "Victor",
    },
    {
      id: 6,
      text: "Xena",
    },
    {
      id: 7,
      text: "Atlas",
    },
    {
      id: 8,
      text: "Zeus",
    },
  ];

  const options = option.map((option, index) => (
    <option key={index} value={option.id}>
      {option.text}
    </option>
  ));

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    axios
      .get(get_bridge, {
        headers: {
          Authorization: `jwt ${token}`,
        },
      })
      .then((response) => {
        let length_of_bridges = response.data["All Spectel Conference"].length;
        let new_input_list = [];

        for (let j = 0; j < length_of_bridges; j++) {
          let obj = { s_conf_id: "", bridge_number: "" };

          obj["s_conf_id"] =
            response.data["All Spectel Conference"][j]["s_conf_id"];

          obj["bridge_number"] =
            response.data["All Spectel Conference"][j]["bridge_number"];

          new_input_list.push(obj);
        }

        if (new_input_list.length > 0) {
          setInputList(new_input_list);
        }
      });
  }, [get_bridge]);

  const onSubmit = () => {
    for (let i = 0; i < inputList.length; i++) {
      inputList[i]["conference"] = props.id;
    }

    setStartConference(false);

    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data1 = JSON.stringify(inputList);

    axios
      .post(create_bridge, data1, {
        headers: {
          Authorization: `jwt ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setStartConference(false);
      });
    // .catch((error) => {
    //   console.log(error);
    //   // let message = error.response.data.error;
    //   // toast.error(`${message}`, {
    //   //   position: "top-right",
    //   //   autoClose: 5000,
    //   //   hideProgressBar: false,
    //   //   closeOnClick: true,
    //   //   pauseOnHover: true,
    //   //   draggable: true,
    //   //   progress: undefined,
    //   // });
    // });
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
    if (inputList.length >= 8) {
      toast.error("Reached at Max Limit", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
                <div className={classes.labelForm}>
                  <div className={classes.labelInput}>
                    <label>Spectel Id</label>
                    <input
                      name="s_conf_id"
                      placeholder="Enter First Name"
                      value={x.s_conf_id}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                  </div>
                  <div
                    className={`${classes.labelInput} ${classes.labelWidth}`}
                  >
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
                  <div className={classes.iconDiv}>
                    {inputList.length !== 1 && (
                      <img
                        src={deleteIcon}
                        alt="DeleteIcon"
                        className={classes.Icon}
                        onClick={() => handleRemoveClick(i)}
                      />
                    )}
                    {inputList.length - 1 === i && inputList.length < 9 && (
                      <img
                        src={AddIcon}
                        alt="AddIcon"
                        className={classes.Icon}
                        onClick={handleAddClick}
                      />
                    )}
                  </div>
                </div>
                <hr className={classes.sepHeight} />
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default AdminConference;
