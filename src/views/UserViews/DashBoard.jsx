import UserSideWrapper from "../../components/UI/Wrapper/UserSideWrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <UserSideWrapper />
    </Fragment>
  );
};

export default Dashboard;
