import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import CreateConference from "../../components/AdminComponents/CreateConferenec/CreateConference";
import { Helmet } from "react-helmet";

const Create = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Create Conference</title>
      </Helmet>
      <Wrapper />
      <NavBar />
      <CreateConference />
    </Fragment>
  );
};

export default Create;
