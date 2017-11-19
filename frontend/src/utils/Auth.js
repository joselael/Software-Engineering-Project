// file: src/util/Auth.js
import axios from 'axios';
import _ from 'lodash';
import Store from '../Store';
import { setToken } from '../actions'
import { URL, LOGIN, LOGOUT, USER } from '../config/Api';


export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function login(username, password) {

  const email = "";
  return axios
    .post(URL + LOGIN, {
      username,
      email,
      password
    })
    .then(function (response) {
      Store.dispatch(setToken(response.data.key));
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function userInfo() {
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  const tokenHeader = "Token "; 

  const header = tokenHeader + Store.getState().token;

  return axios
    .get(URL + USER, {
      Authentication: {
        Token: Store.getState().token
      }
    })
    .then(function (response) {
      alert(response.data);
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function loggedIn() {
  return Store.getState().token == null;
}