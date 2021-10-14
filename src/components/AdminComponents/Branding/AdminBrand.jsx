import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";

import BaseUrl from "../../BaseUrl";
import BrandDataTable from "./BrandDataTable";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import classes from "./AdminBrand.module.css";
import { closePopUpContext } from "../../Context/ClosePopUpContext";
import AddBrandPopUp from "./AddBrandPopUp";

const AdminBrand = () => {
  const { addBrandPopUp, setAddBrandPopUp, deleteBrandPopUp, updateBrandPopUp } =
    useContext(closePopUpContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const countPerPage = 3;

  const all_brands =
    BaseUrl.url +
    `connex/branding/update_brand/?page=${page}&per_page=${countPerPage}&delay=1`;

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    axios
      .get(all_brands, { headers: { Authorization: `jwt ${token}` } })
      .then((response) => {
        setTotalCount(response.data.total_count);
        const obj = response.data["All Brand"];
        let data1 = [];
        for (const i in obj) {
          data1.push({
            ID: obj[i].id,
            BrandImgUrl: obj[i].image,
            Text: obj[i].text,
          });
        }
        setData(data1);
      });
  }, [page,deleteBrandPopUp,all_brands, addBrandPopUp,updateBrandPopUp]);

  const handlePageChange = (p) => {
    setPage(p);
  };

  const AddBrandHandler = () => {
    setAddBrandPopUp(true);
  };


  return (
    <Fragment>
      <Card className={classes.CardDataTable}>
        <div className={classes.action}>
          <Button onClick={AddBrandHandler} className={classes.button}>
            Add Brand
          </Button>
        </div>
        <BrandDataTable
          data={data}
          total_count={totalCount}
          countPerPage={countPerPage}
          handlePageChange={handlePageChange}
        />
      </Card>
      {addBrandPopUp && <AddBrandPopUp />}
    </Fragment>
  );
};

export default AdminBrand;
