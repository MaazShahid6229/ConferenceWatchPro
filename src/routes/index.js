import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserLogin from "../views/UserViews/UserLogin";
import AdminLogIn from "../views/AdminViews/AdminLogIn";
import Home from "../views/AdminViews/Home";
import Create from "../views/AdminViews/Create";
import Search from "../views/AdminViews/Search";
import Branding from "../views/AdminViews/Branding";
import PrivateRoute from "./PrivateRoute";

const index = () => {
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default index;
