import DataTable from "../../UI/DataTable/DataTable";
import Card from "../../UI/Card/Card";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import columns from "./columns";
import classes from "./AdminHome.module.css";
import BaseUrl from "../../BaseUrl";
import { ControlCameraOutlined } from "@material-ui/icons";

const AdminHome = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const countPerPage = 10;
  const baseURL =
    BaseUrl.url +
    `connex/conferenece/create_conference/?page=${page}&per_page=${countPerPage}&delay=1`;

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const obj = response.data["All Conference"];
      let data = [];
      for (const i in obj) {
        data.push({
          CID: obj[i].dash_cid,
          Company: obj[i].dash_company_name,
          Moderator: obj[i].dash_moderator_name,
          Date: obj[i].start_date,
          Email: obj[i].email_addresses[1],
          Password: obj[i].password,
        });
      }
      setData(data);
    });
  }, [page]);

  const handleRowSelected = useCallback((state) => {
    console.log(state.selectedRows);
  }, []);

  return (
    <Card className={classes.CardDataTable}>
      <DataTable
        columns={columns}
        data={data}
        onChangePage={(page) => setPage(page)}
        paginationTotalRows={20}
        paginationPerPage={countPerPage}
        onSelectedRowsChange={handleRowSelected}
      />
    </Card>
  );
};

export default AdminHome;
