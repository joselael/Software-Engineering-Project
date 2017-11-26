import axios from 'axios'
import {URL, LOGIN} from '../urls/API'
import store from '../store'
import { setToken } from '../actions/index';

export function login(Username, Password) {

    return axios.post(
        URL+LOGIN, {
            username:Username,
            email: "",
            password:Password
        } 
    ).then(function(response) {
        store.dispatch(setToken(response.data.key));
        alert("You're logged in!!!")
    }
    ) 
    .catch( (error) => {
        console.log(error);
        alert("Error " + error);
    })
}

export function loggedIn() {
    return store.getState().token != null;
}

export function logout() {
    store.dispatch(setToken(null))
}