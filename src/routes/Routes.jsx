import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

const Routes = () => {
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updateBranPopUp, setUpdateBrandPopUp] = useState(false);
  const [deleteBrandPopUp, setDeleteBrandPopUp] = useState(false);
  const [addBrandPopUp, setAddBrandPopUp] = useState(false);
  return (
    <Router>
      <Switch>
        <closePopUpContext.Provider
          value={{
            updatePopUp,
            deletePopUp,
            setUpdatePopUp,
            setDeletePopUp,
            updateBranPopUp,
            setUpdateBrandPopUp,
            deleteBrandPopUp,
            setDeleteBrandPopUp,
            addBrandPopUp,
            setAddBrandPopUp,
          }}
        >
          <Route path="/" component={UserLogin} exact />

          <Route path="/connexadmin" component={AdminLogIn} exact />

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
        </closePopUpContext.Provider>
      </Switch>
    </Router>
  );
};

export default Routes;
