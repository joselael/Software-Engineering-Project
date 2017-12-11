import axios from 'axios'
import {
  URL,
  LOGIN,
  LOGOUT,
  USER,
  ACCOUNTS,
  ME,
  CREATE,
  UPDATE
} from '../urls/API'
import store from '../store'
import {
  setToken,
  setUser
} from '../actions/index';
import {updateSettings} from './Users'

export function login(Username, Password) {
  return axios({
    method: 'post',
    url: URL + LOGIN,
    data: {
      username: Username,
      password: Password
    }
  }).then((response) => {

    const token = response.data.token
    userInfo(token)

  }).catch((error) => {
    alert(error)
  })
}

export function userInfo(token) {
  return axios({
    method: 'get',
    url: URL + USER + ME,
    headers: {
      'x-access-token': token
    }
    }).then(((response) => {
      if (response.data.blacklisted && !response.data.enabled) {
        alert("You are rejected because " + response.data.admin_message)
      } else if (response.data.blacklisted) {
        alert("GET OFF OUR WEBSITES")
      } else if (!response.data.enabled) {
        alert("You're not enabled")
      } else {
        //Store the blacklist if warning is >= 2 
        if (response.data.warnings >= 2) {
          console.log("Enabling blacklist")
          axios({
            method: 'put',
            url: URL + USER + ME,
            headers: {
              'x-access-token': token
            },
            data: {
              blacklisted: true
            }
          })
        }
        store.dispatch(setToken(token))
       // console.log(response.data)
        store.dispatch(setUser(response.data))
      }
    }))
}

export function loggedIn() {
  if (store.getState().token != null) {
    return true;
  }
  return false;
}

export function logout() {

  return axios({
    method: "get",
    url: URL + LOGOUT
  }).then( (response) => {
    alert("Signing out...")
    store.dispatch(setToken(null))
    store.dispatch(setUser({}))
  }).catch( (err) => {
    alert(err)
    console.log()
  })

}