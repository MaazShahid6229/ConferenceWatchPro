import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";
import DataTable from "../../UI/DataTable/DataTable";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";
import classes from "./HomeDataTable.module.css";
import BaseUrl from "../../BaseUrl";
import conferenceIcon from "../../../assets/conferenceIcon.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

const HomeDataTable = (props) => {
  console.log("render");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { push } = useHistory();
  const { setLoader } = useContext(closePopUpContext);
  const [page, setPage] = useState(1);
  const [userNamePopUp, setUserNamePopUp] = useState(false);
  const countPerPage = 10;

  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);

  const store = JSON.parse(localStorage.getItem("login"));
  const user_email = store.email;
  const token = store.Token;

  const user_conferences =
    BaseUrl.url + "connex/conferenece/conference_listing/";
  // `connex/conferenece/conference_listing/?page=${page}&per_page=${countPerPage}&delay=1`;

  const user_name_check =
    BaseUrl.url + `core/user_profile/username/?email=${user_email}`;

  const username_update = BaseUrl.url + "core/user_profile/username/";

  const handleConferenceButton = (state) => {
    axios
      .get(user_name_check, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        if (!(response.data.Username === "")) {
          push(
            `/home/${state.target.attributes.cid.value}/${state.target.id}/`
          );
          let pair = { username: response.data.Username };
          let obj = { ...store, ...pair };
          localStorage.setItem("login", JSON.stringify(obj));
        } else {
          setUserNamePopUp(true);
        }
      });
  };

  const handlePageChange = (p) => {
    setPage(p);
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get(user_conferences, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        setTotalCount(response.data.total_count);
        const obj = response.data["Active Conference Listing"];
        let data1 = [];
        for (const i in obj) {
          // console.log(obj[i]["conference"])
          data1.push({
            ID: obj[i]["conference"].id,
            CID: obj[i]["conference"].dash_cid,
            Company: obj[i]["conference"].dash_company_name,
            Moderator: obj[i]["conference"].dash_moderator_name,
            Brand: obj[i]["conference"].brand["text"],
            StartDate: obj[i]["conference"].start_date,
            EndDate: obj[i]["conference"].end_date,
            Status: obj[i]["conference"].activated,
          });
        }
        setData(data1);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  }, [page, setLoader, user_conferences, token]);

  const columns = [
    {
      name: "CID",
      selector: (row) => row.CID,
      sortable: true,
      center: true,
    },
    {
      name: "Company",
      selector: (row) => row.Company,
      center: true,
    },
    {
      name: "Moderator",
      selector: (row) => row.Moderator,
      center: true,
    },
    {
      name: "StartDate",
      selector: (row) => row.StartDate,
      sortable: true,
      center: true,
    },
    {
      name: "EndDate",
      selector: (row) => row.EndDate,
      center: true,
    },
    {
      name: "Brand",
      selector: (row) => row.Brand,
      center: true,
    },
    {
      name: "Start Conference",
      grow: 2,
      cell: (row) => (
        <div className={classes.iconDiv}>
          <img
            src={conferenceIcon}
            alt="conferenceIcon"
            className={classes.conferenceIcon}
            onClick={handleConferenceButton}
            id={row.ID}
            cid={row.CID}
          />
        </div>
      ),
      center: true,
      ignoreRowClick: true,
    },
  ];

  const onSubmit = (data) => {
    const parmas = {
      email: user_email,
      username: data.username,
    };
    axios
      .post(username_update, parmas, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        if (response.data.Message === "Update Username") {
          setUserNamePopUp(false);
          let pair = { username: data.Username };
          let obj = { ...store, ...pair };
          localStorage.setItem("login", JSON.stringify(obj));
        }
      });
  };

  return (
    <Fragment>
      <Card className={classes.CardDataTable}>
        <DataTable
          columns={columns}
          data={data}
          onChangePage={(page) => handlePageChange(page)}
          paginationTotalRows={totalCount}
          paginationPerPage={countPerPage}
        />
      </Card>
      {userNamePopUp && (
        <Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.controls}>
              <div className={classes.control}>
                <label>Username</label>
                <input
                  {...register("username", {
                    required: {
                      value: true,
                      message: "username is Required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Value Cannot Exceed 20 Characters ",
                    },
                  })}
                  type="text"
                  placeholder="Enter Your Username"
                  autoComplete="off"
                />
                {errors.username && <p>{errors.message.username}</p>}
              </div>
            </div>
            <div className={classes.actions}>
              <Button type="submit" className={classes.action_yes}>
                Start
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default HomeDataTable;
