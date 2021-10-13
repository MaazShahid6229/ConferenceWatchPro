import React, { useState, useContext, Fragment } from "react";
import axios from "axios";

import DataTable from "../../UI/DataTable/DataTable";
import BaseUrl from "../../BaseUrl";
import BrandDeletePopUp from "./BrandDeletePopUp";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import Card from "../../UI/Card/Card";
import classes from "./BrandDataTable.module.css";
import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";
import AddBrandPopUp from "./AddBrandPopUp"

const delete_brand = BaseUrl.url + "connex/branding/update_brand/";

const BrandDataTable = (props) => {
  const {
    addBrandPopUp,
    setAddBrandPopUp,
    setUpdateBrandPopUp,
    deleteBrandPopUp,
    setDeleteBrandPopUp,
  } = useContext(closePopUpContext);

  const [deleteObj, setDeleteObj] = useState({});
  const [value, setValue] = useState({});
  

  const handleDeleteButton = (state) => {
    setDeleteBrandPopUp(true);
    setDeleteObj({
      id: state.target.id,
      text: state.target.attributes.Text.nodeValue,
    });
  };

  const handleUpdateButton = (state) => {
    // console.log(state.target.attributes.text.nodeValue)
    setValue(state.target.id);
    setValue({
      // Image:state.target.attributes.img.nodeValue,
      BrandName: state.target.attributes.text.nodeValue
    });
    setAddBrandPopUp(true)
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
            src={`http://127.0.0.1:8000${row.BrandImgUrl}`}
            width={120}
            height={100}
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
      {addBrandPopUp && <AddBrandPopUp value= {value} />}
    </Fragment>
  );
};

export default BrandDataTable;
