import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = true;
  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/connexadmin"} />)}
    ></Route>
  );
};
export default PrivateRoute;
