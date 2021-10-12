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

const AdminSearch = (props) => {
  const { deletePopUp, updatePopUp } = useContext(closePopUpContext);

  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [totalCount, setTotalCount] = useState();
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
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data = {
      dash_cid: result.ConferenceId,
      dash_company_name__istartswith: result.Company,
      dash_moderator_name: result.Moderator,
      start_date: result.StartDate,
      email_addresses__email_address:result.Email,
    };
    // moderator, cid, company, start_date, email_address

    if (Object.entries(result).length !== 0) {
      axios
        .post(search_conferences, data, {
          headers: {
            Authorization: `jwt ${token}`,
          },
        })
        .then((response) => {
          setTotalCount(response.data.total_count)
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
          } else {
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
          let message = error.response.data.Massage
          toast.error({message}, {
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
            <label>Conference Id</label>
            <input
              {...register("ConferenceId", {
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
          <div className={classes.control}>
            <label>Company</label>
            <input
              {...register("Company", {
                maxLength: {
                  value: 50,
                  message: "Company Name Cannot Exceed 50 Characters ",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Alphabetical Characters only",
                },
              })}
              type="text"
              placeholder="Enter Company"
            />
            {errors.Company && <p>{errors.Company.message}</p>}
          </div>
          <div className={classes.control}>
            <label>Moderator</label>
            <input
              {...register("Moderator", {
                maxLength: {
                  value: 20,
                  message: "Conference Id Cannot Exceed 20 Characters ",
                },
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Alphabetical Characters only",
                },
              })}
              type="text"
              placeholder="Moderator "
            />
            {errors.Moderator && <p>{errors.Moderator.message}</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="Email1">Email </label>
            <input
              {...register("Email")}
              type="email"
              placeholder="Email"
              name="Email"
            />
          </div>
          <div className={classes.control}>
            <label>Start Date</label>
            <input {...register("StartDate")} type="date" />
          </div>
          <div className={classes.section2}>
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
          total_count={totalCount}
          countPerPage={countPerPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AdminSearch;