import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./AdminSearch.module.css";
import BaseUrl from "../../BaseUrl";
import AdminHome from "../AdminHome/AdminHome";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const CreateConference = (props) => {
  const { deletePopUp, updatePopUp } = useContext(closePopUpContext);

  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const countPerPage = 10;

  const search_conferences =
    BaseUrl.url +
    `connex/search/search_conference/?page=${page}&per_page=${countPerPage}&delay=1`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePageChange = (p) => {
    setPage(p);
  };

  const onSubmit = (data) => {
    setResult(data);
  };

  useEffect(() => {
    if (Object.entries(result).length !== 0) {
      axios
        .post(search_conferences, {
          dash_cid: result.ConferenceId,
        })
        .then((response) => {
          const obj = response.data["All Conference"];
          let data1 = [];
          for (const i in obj) {
            data1.push({
              ID: obj[i].id,
              CID: obj[i].dash_cid,
              Company: obj[i].dash_company_name,
              Moderator: obj[i].dash_moderator_name,
              Brand: obj[i].brand,
              StartDate: obj[i].start_date,
              EndDate: obj[i].end_date,
              Series: obj[i].series,
              Password: obj[i].password,
            });
          }
          if (data1.length !== 0) {
            setData(data1);
            setShowForm(true);
          } 
          else {
            setData([]);
            setShowForm(false);
            toast.error("No Record Found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          toast.error("Server Not Responding", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  }, [result, deletePopUp, updatePopUp, search_conferences]);

  return (
    <div>
      <Card className={classes.login}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.find_form}>
          <div className={classes.control}>
            {/* <label>Conference Id</label> */}
            <input
              {...register("ConferenceId", {
                required: { value: true, message: "This Field is Required" },
                maxLength: {
                  value: 20,
                  message: "Conference Id Cannot Exceed 20 Characters ",
                },
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: "Small Alphabetical and Numbers Characters only",
                },
              })}
              type="text"
              placeholder="Enter Conference Id"
            />
            {errors.ConferenceId && <p>{errors.ConferenceId.message}</p>}
          </div>
          <div className={classes.actions}>
            <Button className={classes.action} type="submit">
              Find Order
            </Button>
          </div>
        </form>
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
      </Card>
      {showForm && (
        <AdminHome
          data={data}
          countPerPage={countPerPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CreateConference;
