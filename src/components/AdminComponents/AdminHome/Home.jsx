import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import BaseUrl from "../../BaseUrl";
import AdminHome from "./AdminHome";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

const Home = (props) => {
  const { setLoader, conferenceApiCall } = useContext(closePopUpContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const countPerPage = 10;

  const all_conferences =
    BaseUrl.url +
    `connex/conferenece/create_conference/?page=${page}&per_page=${countPerPage}&delay=1`;

  useEffect(() => {
    setLoader(true);
    let store = JSON.parse(localStorage.getItem("login"));
    let token = store.Token;
    axios
      .get(all_conferences, { headers: { Authorization: `jwt ${token}` } })
      .then((response) => {
        setTotalCount(response.data.total_count);
        const obj = response.data["All Conference"];
        let data1 = [];
        for (const i in obj) {
          data1.push({
            ID: obj[i].id,
            CID: obj[i].dash_cid,
            Company: obj[i].dash_company_name,
            Moderator: obj[i].dash_moderator_name,
            Brand: obj[i].brand["text"],
            StartDate: obj[i].start_date,
            EndDate: obj[i].end_date,
            Series: obj[i].series,
            Password: obj[i].password,
          });
        }
        setData(data1);
        setLoader(false);
      });
  }, [page, all_conferences, conferenceApiCall, setLoader]);

  const handlePageChange = (p) => {
    setPage(p);
  };

  return (
    <AdminHome
      data={data}
      total_count={totalCount}
      countPerPage={countPerPage}
      handlePageChange={handlePageChange}
    />
  );
};
export default Home;
