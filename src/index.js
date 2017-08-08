import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";
import { AUTH_USER } from "./actions/types";
import App from "./components/app";
import SignIn from "./components/auth/signin";
import SignOut from "./components/auth/signout";
import SignUp from "./components/auth/signup";
import Feature from "./components/feature";
import RequireAuth from "./components/auth/require_auth";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/feature" component={RequireAuth(Feature)} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector(".content")
);
