import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import BaseUrl from "../../BaseUrl";
import BrandDataTable from "./BrandDataTable";
import {closePopUpContext} from "../../Context/ClosePopUpContext"

const AdminBrand = () => {

  const {
    updateBranPopUp,
    deleteBrandPopUp,
  } = useContext(closePopUpContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const countPerPage = 10;

  const all_brands =
    BaseUrl.url +
    `connex/branding/update_brand/?page=${page}&per_page=${countPerPage}&delay=1`;

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    axios
      .get(all_brands, { headers: { Authorization: `jwt ${token}` } })
      .then((response) => {
        console.log(response.data);
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
        console.log(data);
      });
  }, [page, all_brands, deleteBrandPopUp]);

  const handlePageChange = (p) => {
    setPage(p);
  };

  return (
    <BrandDataTable
      data={data}
      total_count={totalCount}
      countPerPage={countPerPage}
      handlePageChange={handlePageChange}
    />
  );
};

export default AdminBrand;
