import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import AdminSearch from "../../components/AdminComponents/AdminSearch/AdminSearch";
import { Helmet } from "react-helmet";

const Search = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Search Conference</title>
      </Helmet>
      <Wrapper />
      <AdminSearch />
    </Fragment>
  );
};

export default Search;
