import axios from "axios";
import { browserHistory } from "react-router";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from "./types";

const ROOT_URL = "http://localhost:3080";

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem("token", response.data.token);
        browserHistory.push("/feature");
      })
      .catch(() => {
        dispatch(authError("Bad Login info"));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
        localStorage.setItem("token", response.data.token);
        browserHistory.push("/feature");
      })
      .catch(response => dispatch(authError(response.response.data.error)));
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function SignOutUser() {
  localStorage.removeItem("token");
  return {
    type: UNAUTH_USER
  };
}
