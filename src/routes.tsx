import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import admin from "./pages/admin";
import Home from "./pages/home";
import Login from "./pages/login";
import MathGame from "./pages/math-game";
import PortugueseGame from "./pages/portuguese-game";
import RegisterPage from "./pages/register";
import UpdateUser from "./pages/update-user";
import { isAuthenticated } from "./services/Auth";
import DefaultTheme from "./themes/default";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const routes = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/signup" exact component={RegisterPage}></Route>

      <DefaultTheme>
        <PrivateRoute
          path="/game/math"
          exact
          component={MathGame}
        ></PrivateRoute>
        <PrivateRoute
          path="/game/portuguese"
          exact
          component={PortugueseGame}
        ></PrivateRoute>
        <PrivateRoute path="/admin" exact component={admin}></PrivateRoute>
        <PrivateRoute
          path="/user/update"
          exact
          component={UpdateUser}
        ></PrivateRoute>
        <PrivateRoute path="/" exact={true} component={Home}></PrivateRoute>
      </DefaultTheme>
    </Switch>
  </Router>
);

export default routes;
