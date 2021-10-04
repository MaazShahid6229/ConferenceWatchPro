import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = false;
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/connexadmin"} />)}
    ></Route>
  );
};
export default PrivateRoute;
