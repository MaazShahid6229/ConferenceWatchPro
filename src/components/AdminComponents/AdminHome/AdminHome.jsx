import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import DataTable from "../../UI/DataTable/DataTable";
import Card from "../../UI/Card/Card";
import classes from "./AdminHome.module.css";
import BaseUrl from "../../BaseUrl";
import DeletePopUp from "./DeletePopUp";
import UpdatePopUp from "./UpdatePopUp";
import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";

const AdminHome = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deleteObj, setDeleteObj] = useState({});
  const [updateObj, setUpdateObj] = useState({});

  const countPerPage = 10;
  const all_conferences =
    BaseUrl.url +
    `connex/conferenece/create_conference/?page=${page}&per_page=${countPerPage}&delay=1`;

  const delete_conference =
    BaseUrl.url + "connex/conferenece/create_conference/";

  const handleDeleteButton = (state) => {
    setDeletePopUp(true);
    setDeleteObj({
      id: state.target.id,
      cid: state.target.attributes.cid.nodeValue,
    });
  };
  const handleUpdateButton = (state) => {
    setUpdatePopUp(true);
    console.log(state.target);
    setUpdateObj({
      id: state.target.id,
      cid: state.target.attributes.cid.nodeValue,
    });
  };

  const handleDeleteYes = () => {
    axios
      .put(delete_conference, {
        conference_id: deleteObj.id,
      })
      .then((response) => {
        console.log(response);
      });
    setDeletePopUp(false);
  };

  const handleDeleteNo = () => {
    setDeletePopUp(false);
  };

  const updateHandle = () => {
    setUpdatePopUp(false);
    console.log("Update");
  };

  const closeHandle = () => {
    setUpdatePopUp(false);
  };

  useEffect(() => {
    axios.get(all_conferences).then((response) => {
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
      setData(data);
    });
  }, [page, deletePopUp]);

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
      name: "Password",
      selector: (row) => row.Password,
      center: true,
      grow: 2,
    },
    {
      cell: (row) => (
        <div className={classes.iconDiv}>
          <img
            src={deleteIcon}
            alt="DeleteIcon"
            className={classes.deleteIcon}
            onClick={handleDeleteButton}
            id={row.ID}
            cid={row.CID}
          />
          <img
            src={editIcon}
            alt="EditIcon"
            className={classes.editIcon}
            onClick={handleUpdateButton}
            cid={row.CID}
          />
        </div>
      ),
      center: true,
      ignoreRowClick: true,
    },
  ];

  return (
    <Fragment>
      <Card className={classes.CardDataTable}>
        <DataTable
          columns={columns}
          data={data}
          onChangePage={(page) => setPage(page)}
          paginationTotalRows={20}
          paginationPerPage={countPerPage}
        />
      </Card>
      {deletePopUp && (
        <DeletePopUp
          deleteYes={handleDeleteYes}
          deleteNo={handleDeleteNo}
          value={deleteObj.cid}
        />
      )}
      {/* {updatePopUp && (
        <UpdatePopUp
          updateHandle={updateHandle}
          closeHandle={closeHandle}
          value={updateObj.cid}
        />
      )} */}
    </Fragment>
  );
};

export default AdminHome;
