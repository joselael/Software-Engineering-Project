import axios from 'axios'
import {URL, LOGIN} from '../urls/API'
import store from '../store'

export function login(Username, Password) {

    return axios.post(
        URL+LOGIN, {
            username:Username,
            email: "",
            password:Password
        } 
    ).then(
        (response) => response.data.key
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

    return axios.post(

    )
}