import UserSideWrapper from "../../components/UI/Wrapper/UserSideWrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import HomeDataTable from "../../components/UserComponent/HomeDataTable/HomeDataTable"
// import ChatDashBoard from "../../components/UserComponent/ChatDashBoard/ChatDashBoard";

const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <UserSideWrapper />
      <HomeDataTable/>
      {/* <ChatDashBoard /> */}
    </Fragment>
  );
};

export default Dashboard;
