import React, { useState, useContext, Fragment } from "react";
import axios from "axios";

import DataTable from "../../UI/DataTable/DataTable";
import BaseUrl from "../../BaseUrl";
import BrandDeletePopUp from "./BrandDeletePopUp";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import classes from "./BrandDataTable.module.css";
import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";
import UpdateBrandPopUp from "./UpdateBrandPopUp";

const delete_brand = BaseUrl.url + "connex/branding/update_brand/";

const BrandDataTable = (props) => {
  const {
    updateBrandPopUp,
    setUpdateBrandPopUp,
    deleteBrandPopUp,
    setDeleteBrandPopUp,
  } = useContext(closePopUpContext);

  const [deleteObj, setDeleteObj] = useState({});
  const [value1, setValue1] = useState({});

  const handleDeleteButton = (state) => {
    setDeleteBrandPopUp(true);
    setDeleteObj({
      id: state.target.id,
      text: state.target.attributes.Text.nodeValue,
    });
  };

  const handleUpdateButton = (state) => {
    setUpdateBrandPopUp(true);
    setValue1({
      id: state.target.id,
      Image: state.target.attributes.img.nodeValue,
      BrandName: state.target.attributes.text.nodeValue,
    });
  };

  const handleDeleteYes = () => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;

    var data1 = {
      brand_id: deleteObj.id,
    };
    axios
      .post(delete_brand, data1, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {});
    setDeleteBrandPopUp(false);
  };

  const handleDeleteNo = () => {
    setDeleteBrandPopUp(false);
  };

  const columns = [
    {
      name: "Image",
      center: true,
      selector: (row) => (
        <div className={classes.BrandImage}>
          <img
            src={`${BaseUrl.url}${row.BrandImgUrl}`}
            width={100}
            height={90}
            alt="Brand"
          />
        </div>
      ),
    },
    {
      name: "Brand Name",
      selector: (row) => row.Text,
      sortable: true,
      center: true,
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
            text={row.Text}
          />
          <img
            src={editIcon}
            alt="EditIcon"
            className={classes.editIcon}
            onClick={handleUpdateButton}
            id={row.ID}
            text={row.Text}
            img={row.BrandImgUrl}
          />
        </div>
      ),
      center: true,
      ignoreRowClick: true,
    },
  ];

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={props.data}
        onChangePage={(page) => props.handlePageChange(page)}
        paginationTotalRows={props.total_count}
        paginationPerPage={props.countPerPage}
      />
      {deleteBrandPopUp && (
        <BrandDeletePopUp
          deleteYes={handleDeleteYes}
          deleteNo={handleDeleteNo}
          value={deleteObj.text}
        />
      )}
      {updateBrandPopUp && <UpdateBrandPopUp value1={value1} />}
    </Fragment>
  );
};

export default BrandDataTable;
