import { Route, Switch } from "react-router-dom";
import UserLogin from "../views/UserViews/UserLogin";
import AdminLogIn from "../views/AdminViews/AdminLogIn";
import Home from "../views/AdminViews/Home";
import Create from "../views/AdminViews/Create";
import Search from "../views/AdminViews/Search";
import Branding from "../views/AdminViews/Branding";
// import PageNotFound from "../views/AdminViews/PgaeNotFound";
import PrivateRoute from "./PrivateRoute";

import { useState } from "react";
import { closePopUpContext } from "../components/Context/ClosePopUpContext";

const App = () => {
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updateBrandPopUp, setUpdateBrandPopUp] = useState(false);
  const [deleteBrandPopUp, setDeleteBrandPopUp] = useState(false);
  const [addBrandPopUp, setAddBrandPopUp] = useState(false);
  const [startConference, setStartConference] = useState(false);
  const [loader, setLoader] = useState(true);

  return (
    <Switch>
      <closePopUpContext.Provider
        value={{
          loader,
          setLoader,
          startConference,
          setStartConference,
          updatePopUp,
          deletePopUp,
          setUpdatePopUp,
          setDeletePopUp,
          updateBrandPopUp,
          setUpdateBrandPopUp,
          deleteBrandPopUp,
          setDeleteBrandPopUp,
          addBrandPopUp,
          setAddBrandPopUp,
        }}
      >
        <PrivateRoute path="/connexadmin/home" exact>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/connexadmin/create" exact>
          <Create />
        </PrivateRoute>
        <PrivateRoute path="/connexadmin/search" exact>
          <Search />
        </PrivateRoute>
        <PrivateRoute path="/connexadmin/branding" exact>
          <Branding />
        </PrivateRoute>

        <Route path="/connexadmin" component={AdminLogIn} exact />
        <Route path="/" component={UserLogin} exact />
      </closePopUpContext.Provider>
    </Switch>
  );
};

export default App;
