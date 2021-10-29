import Wrapper from "../../components/UI/Wrapper/Wrapper";
import NavBar from "../../components/UI/NavBar/NavBar";
import AHome from "../../components/AdminComponents/AdminHome/Home";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Wrapper />
      <AHome />
    </Fragment>
  );
};

export default Home;
