import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import CreateConference from "../../components/AdminComponents/CreateConferenec/CreateConference";
import { Helmet } from "react-helmet";

const Create = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Create Conference</title>
      </Helmet>
      <Wrapper />
      <CreateConference />
    </Fragment>
  );
};

export default Create;
