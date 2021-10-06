import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import BaseUrl from "../../BaseUrl";
import AdminHome from "./AdminHome";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

const Home = (props) => {
  const { updatePopUp, deletePopUp } = useContext(closePopUpContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const countPerPage = 10;

  const all_conferences =
    BaseUrl.url +
    `connex/conferenece/create_conference/?page=${page}&per_page=${countPerPage}&delay=1`;

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
      setData(data1);
    });
  }, [page, all_conferences, updatePopUp,deletePopUp]);

  const handlePageChange = (p) => {
    setPage(p);
  };

  return (
    <AdminHome
      data={data}
      countPerPage={countPerPage}
      handlePageChange={handlePageChange}
    />
  );
};
export default Home;