import { Route, Redirect } from "react-router-dom";

const UserPrivateRoute = ({ children, ...rest }) => {
  let store = JSON.parse(localStorage.getItem("login"));
  let isAuth = false;

  if (store?.Token) {
    if (store?.Role === "U" || store?.Role === "A") {
      isAuth = true;
    }
  } else {
    isAuth = false;
  }

  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/"} />)}
    ></Route>
  );
};
export default UserPrivateRoute;
