import {  useContext } from "react";
import DataTable,{createTheme } from "react-data-table-component";
import { closePopUpContext } from "../../Context/ClosePopUpContext";

import ArrowDownward from "@material-ui/icons/ArrowDownward";


const sortIcon = <ArrowDownward />;

// createTheme inherits from the default `light` theme.
createTheme("solarized", {
  text: {
    primary: "#000000",
    secondary: "#787997",
  },
  background: {
    default: "#EEE9E9",
  },
  context: {
    background: "#cb4b16",
    text: "#898282",
  },
  divider: {
    default: "#D5D5D5",
  },
});

const customStyles = {
  header: {
		style: {
			minHeight: '28px',
		},
	},
  title: {
    style: {
      // fontSize: '28px',
     // fontWeight: '1200',
     minHeight: '72px', // override the row height
    }
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      fontSize: '22px',
      fontWeight: '300',
      color: "#424040",
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
};

function DataTableBase(props) {

  const {
    loader,
  } = useContext(closePopUpContext);

  return (
    <DataTable
      theme="solarized"
      customStyles={customStyles}
      progressPending={loader}
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
