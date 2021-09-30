import React from "react";
import DataTable from "react-data-table-component";

import ArrowDownward from "@material-ui/icons/ArrowDownward";

const sortIcon = <ArrowDownward />;

function DataTableBase(props) {
  return (
    <DataTable
    title="Conference"
      pagination
      paginationServer
      sortIcon={sortIcon}
      highlightOnHover
      paginationComponentOptions={{
        noRowsPerPage: true,
      }}
      dense
      {...props}
    />
  );
}

export default DataTableBase;
