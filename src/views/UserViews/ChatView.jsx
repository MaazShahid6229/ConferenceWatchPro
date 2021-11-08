import { useParams } from "react-router-dom";
import UserSideWrapper from "../../components/UI/Wrapper/UserSideWrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import ChatDashBoard from "../../components/UserComponent/ChatDashBoard/ChatDashBoard";

const UserHome = () => {
    let { cid,id } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <UserSideWrapper />
      <ChatDashBoard cid={cid} id={id} />
    </Fragment>
  );
};

export default UserHome;
