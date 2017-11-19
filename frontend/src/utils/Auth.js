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
      console.log(response.data.key);
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

  const tokenHeader = "Token a633e76e6de11b000f7ba7f1e074d20dd0100de9"; 

  return axios
    .get(URL + USER, {
      tokenHeader
    })
    .then(function (response) {
      console.log(response.data.first_name)
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