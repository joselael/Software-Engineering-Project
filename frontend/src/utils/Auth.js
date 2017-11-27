import axios from 'axios'
import { URL, LOGIN, USER, REGISTER } from '../urls/API'
import store from '../store'
import { setToken, setUser } from '../actions/index';

export function getUser(Token) {
    return axios({
        method: 'get',
        url: URL+USER,
        headers: {
            'x-access-token': store.getState().token
        }
    }).then(function(response) {
        store.dispatch(setUser(response.data))
    }).catch( (error) => {
        console.log(error);
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
        getUser(response.data.token)
        alert("You're logged in!!!")
    }).catch( (error) => {
        alert(error)
    })
}

//Register user
export function register(Username, Password, First_name, Last_name, User_type, Email) {

    return axios({
        method: 'post',
        url: URL+REGISTER,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username: Username,
            password: Password,
            first_name: First_name,
            last_name: Last_name,
            user_type: User_type,
            email: Email
        }
    }).then(function(response) {
        console.log(response.data)
        alert("Sending request to admin")
    }).catch( (error) => {
        alert(error)
    })

}

export function loggedIn() {
    if (store.getState().token != null) {
        return true;
    }
    return false;
}

export function logout() {
    store.dispatch(setToken(null))
    store.dispatch(setUser({}))
}