import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import AdminHome from "../../components/AdminComponents/AdminHome/AdminHome";

const Home = () => {
  return (
    <Fragment>
      <Wrapper />
      <NavBar />
      <AdminHome/>
    </Fragment>
  );
};

export default Home;
