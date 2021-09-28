const handleButtonClick = () => {
		
  console.log('clicked');
};



const columns = [
  {
    cell: () => <button onClick={handleButtonClick}>Action</button>,
    allowOverflow: true,
    button: true,
  },
  {
    name: "CID",
    selector: (row) => row.CID,
    sortable: true,
    center: true,
  },
  {
    name: "Company",
    selector: (row) => row.Company,
    center: true,
  },
  {
    name: "Moderator",
    selector: (row) => row.Moderator,
    center: true,
  },
  {
    name: "Date",
    selector: (row) => row.Date,
    sortable: true,
    center: true,
  },
  {
    name: "Email",
    selector: (row) => row.Email,
    center: true,
  },
  {
    name: "Password",
    selector: (row) => row.Password,
    center: true,
    grow: 2,
  },
];

export default columns;
