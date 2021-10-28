import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Wrapper />
    </Fragment>
  );
};

export default Dashboard;
