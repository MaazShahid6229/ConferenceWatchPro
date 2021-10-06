import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import AdminSearch from "../../components/AdminComponents/AdminSearch/AdminSearch"

const Search = () => {
  return (
    <Fragment>
      <Wrapper />
      <NavBar />
      <AdminSearch/>
    </Fragment>
  );
};

export default Search;
