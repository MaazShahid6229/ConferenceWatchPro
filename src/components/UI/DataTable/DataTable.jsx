import React from "react";
import DataTable from "react-data-table-component";
import Checkbox from "@material-ui/core/Checkbox";
import customStyles from "./customStyles";

import ArrowDownward from "@material-ui/icons/ArrowDownward";

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

function DataTableBase(props) {
  return (
    <DataTable
      pagination
      paginationServer
      selectableRowsSingle
      selectableRowsComponent={Checkbox}
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      // customStyles={customStyles}
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
