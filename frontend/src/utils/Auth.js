import axios from 'axios'
import { URL, LOGIN, USER, REGISTER } from '../urls/API'
import store from '../store'
import { setToken } from '../actions/index';
import { storages } from 'redux-persist';

export function getUser(Token) {
    return axios({
        method: 'get',
        url: URL+USER,
        headers: {
            'x-access-token': Token
        }
    }).then(function(response){
        console.log(response.data)
    })
}

export function login(Username, Password) {

    return axios({
        method: 'post',
        url: URL+LOGIN, 
        data: {
            username:Username,
            password:Password
        } 
    }).then(function(response) {
        store.dispatch(setToken(response.data.token))
        alert("You're logged in!!!")
    }
    ) 
    .catch( (error) => {
        console.log(error);
        alert("Error " + error);
    })
}

/*
export function register(Username, Password, First_name, Last_name, User_type) {

    return axios.post(
        URL+REGISTER, 
    )
}
*/

export function loggedIn() {
    if (store.getState().token != null) {
        return true;
    }
    return false;
}

export function logout() {
    store.dispatch(setToken(null))
}