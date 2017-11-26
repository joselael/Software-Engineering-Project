import axios from 'axios'
import { URL, LOGIN, USER } from '../urls/API'
import store from '../store'
import { setToken } from '../actions/index';

export function getUser(Token) {

    const auth = {
        "Authentication":"Token 09c2a9a1e4c46458a60f183a93e9eb8ad34eac19"
    }

    return axios.get(
        "localhost:8000/rest-auth/user/",
        auth
    ).then((function(response){
        console.log(response.data)
    }))
}

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