import { Fragment, useContext, useState } from "react";
import axios from "axios";

import DataTable from "../../UI/DataTable/DataTable";
import Card from "../../UI/Card/Card";
import classes from "./AdminHome.module.css";
import BaseUrl from "../../BaseUrl";
import DeletePopUp from "./DeletePopUp";
import UpdatePopUp from "./UpdatePopUp";
import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";
import conferenceIcon from "../../../assets/conferenceIcon.png";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import AdminConference from "../AdminConference/AdminConference";

const AdminHome = (props) => {
  const {
    deletePopUp,
    setDeletePopUp,
    updatePopUp,
    setUpdatePopUp,
    startConference,
    setStartConference,
  } = useContext(closePopUpContext);

  const [deleteObj, setDeleteObj] = useState({});
  const [updateObj, setUpdateObj] = useState({});
  const [conferenceObj, setConferenceObj] = useState();

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
    setUpdateObj({
      id: state.target.id,
      cid: state.target.attributes.cid.nodeValue,
    });
  };

  const handleConferenceButton = (state) => {
    setStartConference(true);
    setConferenceObj(state.target.id);
  };

  const handleDeleteYes = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    var data1 = {
      conference_id: deleteObj.id,
    };
    axios
      .put(delete_conference, data1, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {});
    setDeletePopUp(false);
  };

  const handleDeleteNo = () => {
    setDeletePopUp(false);
  };

  const closeHandle = () => {
    setUpdatePopUp(false);
  };

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
          {/* <img
            src={conferenceIcon}
            alt="conferenceIcon"
            className={classes.conferenceIcon}
            onClick={handleConferenceButton}
            id={row.ID}
          /> */}
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
          data={props.data}
          onChangePage={(page) => props.handlePageChange(page)}
          paginationTotalRows={props.total_count}
          paginationPerPage={props.countPerPage}
        />
      </Card>
      {deletePopUp && (
        <DeletePopUp
          deleteYes={handleDeleteYes}
          deleteNo={handleDeleteNo}
          value={deleteObj.cid}
        />
      )}
      {updatePopUp && (
        <UpdatePopUp closeHandle={closeHandle} value={updateObj.cid} />
      )}
      {/* {startConference && <AdminConference id={conferenceObj} />} */}
    </Fragment>
  );
};

export default AdminHome;
