import UserSideWrapper from "../../components/UI/Wrapper/UserSideWrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import HomeDataTable from "../../components/UserComponent/HomeDataTable/HomeDataTable";

const UserHome = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <UserSideWrapper />
      <HomeDataTable/>
    </Fragment>
  );
};

export default UserHome;
