import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

import Constants from "./Constants";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const ProductsForm = React.lazy(() =>
  import("./views/Pages/ProductsForm/ProductsForm")
);
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

class App extends Component {
  isAuthenticated = function(targetComponent) {
    // if (window.fub.state.isUserLoggedIn === true) {
    //   return targetComponent;
    // } else if (window.fub.state.isMaintenance) {
    //   return <Redirect to={Constants.Routes.Maintenance} />;
    // } else {
    //   console.log(
    //     "Routes are ** NOT ** allowed. Redirecting to Home. ",
    //     window.location.href
    //   );
    //   return <Redirect to={Constants.Routes.Login} />;
    // }
    return targetComponent;
  };
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            {/* <Route
              exact
              path="/register"
              name="Register Page"
              render={props => this.isAuthenticated(<Register {...props} />)}
            /> */}
            <Route
              exact
              path="/404"
              name="Page 404"
              render={props => this.isAuthenticated(<Page404 {...props} />)}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={props => this.isAuthenticated(<Page500 {...props} />)}
            />

            {/* <Route
              exact
              path="/addProducts"
              name="Products"
              render={props =>
                this.isAuthenticated(<ProductsForm {...props} />)
              }
            /> */}
            <Route
              path="/"
              name="Home"
              render={props =>
                this.isAuthenticated(<DefaultLayout {...props} />)
              }
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
