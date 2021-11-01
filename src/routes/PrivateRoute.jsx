import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  
  let store = JSON.parse(localStorage.getItem("login"));
  let isAuth = false
  if (store?.Token && store?.Role === "A"){
     isAuth = true
  }
  else{
     isAuth = false
  }

  return (
    <Route
      {...rest}
      render={() => (isAuth ? children : <Redirect to={"/connexadmin"} />)}
    ></Route>
  );
};
export default PrivateRoute;
