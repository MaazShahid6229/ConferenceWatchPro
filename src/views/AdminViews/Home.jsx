import Wrapper from "../../components/UI/Wrapper/Wrapper";
import NavBar from "../../components/UI/NavBar/NavBar";
import AHome from "../../components/AdminComponents/AdminHome/Home";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <Wrapper />
      <NavBar />
      <AHome />
    </Fragment>
  );
};

export default Home;
