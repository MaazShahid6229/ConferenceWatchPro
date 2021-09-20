import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import CreateConference from "../../components/AdminComponents/CreateConferenec/CreateConference";

const Create = () => {
  return (
    <Fragment>
      <Wrapper />
      <NavBar />
      <CreateConference/>
    </Fragment>
  );
};

export default Create;
