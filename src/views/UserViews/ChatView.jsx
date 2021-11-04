import { useParams } from "react-router-dom";
import UserSideWrapper from "../../components/UI/Wrapper/UserSideWrapper";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import ChatDashBoard from "../../components/UserComponent/ChatDashBoard/ChatDashBoard";

const UserHome = () => {
  console.log("ChatView")
    let { cid } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <UserSideWrapper />
      <ChatDashBoard cid={cid} />
    </Fragment>
  );
};

export default UserHome;
