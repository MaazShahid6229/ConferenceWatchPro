import { BrowserRouter as Router, Route } from "react-router-dom";
import UserLogin from "../views/UserViews/UserLogin";
import AdminLogIn from "../views/AdminViews/AdminLogIn";
import Home from "../views/AdminViews/Home";
import Create from "../views/AdminViews/Create";


const index = () => {
  return (
    <Router>
      <Route path="/" component={UserLogin} exact />
      <Route path="/connexadmin" component={AdminLogIn} exact />
      <Route path="/connexadmin/home" component={Home} exact />
      <Route path="/connexadmin/create" component={Create} exact />
    </Router>
  );
};

export default index;
