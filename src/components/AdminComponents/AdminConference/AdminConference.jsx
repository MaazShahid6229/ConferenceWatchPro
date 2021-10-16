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
    { Spectel_Id: "", Spectel_Bridge: "" },
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
      console.log(props)
    console.log(JSON.stringify(inputList));
    setStartConference(false);

    // let store = JSON.parse(localStorage.getItem("login"));
    // let token = store.Token;

    // var data1 = new FormData();

    // data1.append("conference", props.id);
    // data1.append("bridge_number", data.Spectel_Bridge_1);
    // data1.append("s_conf_id", data.Spectel_Id_2);

    // axios
    //   .post(create_bridge, data1, {
    //     headers: {
    //       Authorization: `jwt ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setStartConference(false);
    //     console.log(response);
    //   });
    //   .catch((error) => {
    //     let message = error.response.data.error;
    //     toast.error(`${message}`, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   });
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
    setInputList([...inputList, { Spectel_Id: "", Spectel_Bridge: "" }]);
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
                      name="Spectel_Id"
                      placeholder="Enter First Name"
                      value={x.Spectel_Id}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                  </div>
                  <div className={classes.control}>
                    <label>Spectel Bridge</label>
                    <select
                      name="Spectel_Bridge"
                      placeholder="Enter First Name"
                      value={x.Spectel_Bridge}
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
                  {inputList.length - 1 === i && inputList.length <11 && (
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

// import React, { Fragment, useContext } from "react";
// import { useForm } from "react-hook-form";
// import Modal from "../../UI/Modal/Modal";
// import Button from "../../UI/Button/Button";
// import classes from "./AdminConference.module.css";
// import closeIcon from "../../../assets/close.png";
// import { closePopUpContext } from "../../Context/ClosePopUpContext";
// import { ToastContainer, toast } from "react-toastify";
// import BaseUrl from "../../BaseUrl";

// import axios from "axios";

// const AdminConference = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const create_bridge = BaseUrl.url + "connex/spectel/create_Spectel_Conf/";

//   const { setStartConference } = useContext(closePopUpContext);

//   const PopUpCloseHandler = () => {
//     setStartConference(false);
//   };

//   const option = [
//     {
//       id:0,
//       text: "Harvey",
//     },
//     {
//       id:1,
//       text: "Grace",
//     },
//     {
//       id:3,
//       text: "Oscar",
//     },
//     {
//       id:4,
//       text: "Isabel",
//     },
//     {
//       id:5,
//       text: "Victor",
//     },
//     {
//       id:6,
//       text: "Pearl",
//     },
//     {
//       id:7,
//       text: "Atlas",
//     },
//     {
//       id:8,
//       text: "Xena",
//     },
//     {
//       id:9,
//       text: "Zeus",
//     },
//   ];

//   const options = option.map((option, index) => (
//     <option key={index} value={option.id}>
//       {option.text}
//     </option>
//   ));

//   const onSubmit = (data) => {
//     // console.log(props.id);
//     // console.log(data);
//     setStartConference(false);

//     // let store = JSON.parse(localStorage.getItem("login"));
//     // let token = store.Token;

//     // var data1 = new FormData();

//     // data1.append("conference", props.id);
//     // data1.append("bridge_number", data.Spectel_Bridge_1);
//     // data1.append("s_conf_id", data.Spectel_Id_2);

//     // axios
//     //   .post(create_bridge, data1, {
//     //     headers: {
//     //       Authorization: `jwt ${token}`,
//     //     },
//     //   })
//     //   .then((response) => {
//     //     setStartConference(false);
//     //     console.log(response);
//     //   });
//     //   .catch((error) => {
//     //     let message = error.response.data.error;
//     //     toast.error(`${message}`, {
//     //       position: "top-right",
//     //       autoClose: 5000,
//     //       hideProgressBar: false,
//     //       closeOnClick: true,
//     //       pauseOnHover: true,
//     //       draggable: true,
//     //       progress: undefined,
//     //     });
//     //   });
//   };

//   return (
//     <Fragment>
//       <Modal>
//         <br />
//         <div className={classes.divCloseIcon}>
//           <img
//             onClick={PopUpCloseHandler}
//             className={classes.closeIcon}
//             src={closeIcon}
//             alt="Close Icon"
//           />
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
//           <div className={classes.controls}>
//             <div className={classes.control}>
//               <label>Spectel Id</label>
//               <input
//                 {...register("Spectel_Id_1", {
//                   required: { value: true, message: "Spectel Id is Required" },
//                 })}
//                 type="text"
//                 placeholder="Spectel Id"
//               />
//               {errors.Spectel_Id_1 && <p>{errors.Spectel_Id_1.message}</p>}
//             </div>
//             <div className={classes.control}>
//               <label>Spectel Bridge</label>
//               <select
//                 name="Spectel_Bridge_1"
//                 {...register("Spectel_Bridge_1", {
//                   required: {
//                     value: true,
//                     message: "Spectel Bridge is Required",
//                   },
//                 })}
//               >
//                 {options}
//               </select>
//               {errors.Spectel_Bridge_1 && (
//                 <p>{errors.Spectel_Bridge_1.message}</p>
//               )}
//             </div>
//           </div>
//           <div className={classes.controls}>
//             <div className={classes.control}>
//               <label>Spectel Id</label>
//               <input
//                 {...register("Spectel_Id_2", {
//                   required: { value: true, message: "Spectel Id is Required" },
//                 })}
//                 type="text"
//                 placeholder="Spectel Id"
//               />
//               {errors.Spectel_Id_2 && <p>{errors.Spectel_Id_2.message}</p>}
//             </div>
//             <div className={classes.control}>
//               <label>Spectel Bridge</label>
//               <select
//                 name="Spectel_Bridge_2"
//                 {...register("Spectel_Bridge_2", {
//                   required: {
//                     value: true,
//                     message: "Spectel Bridge is Required",
//                   },
//                 })}
//               >
//                 {options}
//               </select>
//               {errors.Spectel_Bridge_2 && (
//                 <p>{errors.Spectel_Bridge_2.message}</p>
//               )}
//             </div>
//           </div>
//           <div className={classes.controls}>
//             <div className={classes.control}>
//               <label>Spectel Id</label>
//               <input
//                 {...register("Spectel_Id_3", {
//                   required: { value: true, message: "Spectel Id is Required" },
//                 })}
//                 type="text"
//                 placeholder="Spectel Id"
//               />
//               {errors.Spectel_Id_3 && <p>{errors.Spectel_Id_3.message}</p>}
//             </div>
//             <div className={classes.control}>
//               <label>Spectel Bridge</label>
//               <select
//                 name="Spectel_Bridge_3"
//                 {...register("Spectel_Bridge_3", {
//                   required: {
//                     value: true,
//                     message: "Spectel Bridge is Required",
//                   },
//                 })}
//               >
//                 {options}
//               </select>
//               {errors.Spectel_Bridge_3 && (
//                 <p>{errors.Spectel_Bridge_3.message}</p>
//               )}
//             </div>
//           </div>
//           <div className={classes.section2}>
//             <Button
//               onClick={PopUpCloseHandler}
//               className={classes.action_close}
//               type="button"
//             >
//               Close
//             </Button>
//             <Button className={classes.action} type="submit">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </Modal>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Fragment>
//   );
// };

// export default AdminConference;
