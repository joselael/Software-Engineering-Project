// file: src/util/Auth.js
import axios from 'axios';
import _ from 'lodash';
import Store from '../Store';
import { setToken } from '../actions'
import { URL, LOGIN, LOGOUT } from '../config/Api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

const email = "";

export function login(username, password) {
  return axios
    .post(URL + LOGIN, {
      username,
      email,
      password
    })
    .then(function (response) {
      Store.dispatch(setToken(response.data.token));
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function logout() {
  return axios
    .post(URL + LOGOUT)
    .then(function (response) {
      Store.dispatch(setToken(response.data.token));
    })
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function register(username, password) {
  return axios
    .post(URL + LOGIN, {
      username,
      password
    })
    .then(function (response) {
      Store.dispatch(setToken(response.data.token));
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