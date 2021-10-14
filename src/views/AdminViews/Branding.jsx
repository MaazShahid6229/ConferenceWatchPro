import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import AdminBrand from "../../components/AdminComponents/Branding/AdminBrand";

const Branding = () => {
  return (
    <Fragment>
      <Wrapper />
      <NavBar />
      <AdminBrand/>
    </Fragment>
  );
};

export default Branding;
