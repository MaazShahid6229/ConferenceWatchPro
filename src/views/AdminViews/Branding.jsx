import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import AdminBrand from "../../components/AdminComponents/Branding/AdminBrand";
import { Helmet } from "react-helmet";

const Branding = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <Wrapper />
      <AdminBrand />
    </Fragment>
  );
};

export default Branding;
