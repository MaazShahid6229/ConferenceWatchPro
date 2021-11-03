import { useContext, useEffect, useState } from "react";
import axios from "axios";

import DataTable from "../../UI/DataTable/DataTable";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";
import classes from "./HomeDataTable.module.css";
import BaseUrl from "../../BaseUrl";
import conferenceIcon from "../../../assets/conferenceIcon.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

const HomeDataTable = (props) => {
  const { push } = useHistory();
  const { setLoader } = useContext(closePopUpContext);
  const [page, setPage] = useState(1);
  const countPerPage = 10;

  const [totalCount, setTotalCount] = useState();
  const [data, setData] = useState([]);

  const handleConferenceButton = (state) => {
    push(`/home/${state.target.id}/`);
  };

  const handlePageChange = (p) => {
    setPage(p);
  };

  const user_conferences =
    BaseUrl.url + "connex/conferenece/conference_listing/";
  // `connex/conferenece/conference_listing/?page=${page}&per_page=${countPerPage}&delay=1`;

  useEffect(() => {
    setLoader(true);
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
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
            ID: obj[i].id,
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
        console.log(error.response.data);
        setLoader(false);
      });
  }, [page, setLoader, user_conferences]);

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
      name: "Status",
      selector: (row) => row.Status,
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
            id={row.CID}
          />
        </div>
      ),
      center: true,
      ignoreRowClick: true,
    },
  ];

  return (
    <Card className={classes.CardDataTable}>
      <DataTable
        columns={columns}
        data={data}
        onChangePage={(page) => handlePageChange(page)}
        paginationTotalRows={totalCount}
        paginationPerPage={countPerPage}
      />
    </Card>
  );
};

export default HomeDataTable;
