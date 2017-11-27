import axios from 'axios'
import { URL, LOGIN, USER, REGISTER } from '../urls/API'
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

    return axios({
        method: 'post',
        url: URL+LOGIN, 
        data: {
            username:Username,
            password:Password
        } 
    }).then(function(response) {
        console.log(response)
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
    return store.getState().token != null;
}

export function logout() {
    store.dispatch(setToken(null))
}