import Wrapper2 from "../../components/UI/Wrapper/Wrapper2";
import { Fragment, useState } from "react";
import UserLogInForm from "../../components/UserComponent/LogIn/UserLogInForm/UserLogInForm";
import LogInPopUp from "../../components/UserComponent/LogIn/LogInPopUp/LogInPopUp";

const UserLogin = () => {
  const [popUpIsShown, setPopUpIsShown] = useState(false);

  const ShowPopUp = () => {
    setPopUpIsShown(true);
  };

  const HidePopUp = () => {
    setPopUpIsShown(false);
  };
  return (
    <Fragment>
      <Wrapper2 />
      {popUpIsShown && <LogInPopUp onClick={HidePopUp} />}
      <UserLogInForm onClick={ShowPopUp} />
    </Fragment>
  );
};

export default UserLogin;
