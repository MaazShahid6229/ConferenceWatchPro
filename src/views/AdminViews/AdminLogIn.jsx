import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { Fragment, useState } from "react";
import AdminLogInPopUp from "../../components/AdminComponents/LogIn/AdminLogInPopUp/AdminLogInPopUp";
import AdminLogInForm from "../../components/AdminComponents/LogIn/AdminLogInForm/AdminLogInForm";
import { Helmet } from "react-helmet";

const AdminLogin = () => {
  const [popUpIsShown, setPopUpIsShown] = useState(false);

  const ShowPopUp = () => {
    setPopUpIsShown(true);
  };

  const HidePopUp = () => {
    setPopUpIsShown(false);
  };
  return (
    <Fragment>
      <Helmet>
        <title>ConnexAdmin</title>
      </Helmet>
      <Wrapper />
      {popUpIsShown && <AdminLogInPopUp onClick={HidePopUp} />}
      <AdminLogInForm onClick={ShowPopUp} />
    </Fragment>
  );
};

export default AdminLogin;
