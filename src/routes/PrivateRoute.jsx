import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  let store = JSON.parse(localStorage.getItem("login"));
  let isAuth = store?.Token ? true : false;

  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/connexadmin"} />)}
    ></Route>
  );
};
export default PrivateRoute;
