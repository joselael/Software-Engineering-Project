import axios from 'axios'
import {URL, USER, ACCOUNTS, CREATE, ME, CHECK} from '../urls/API'

//Register user
export function register(Username, Password, First_name, Last_name, User_type, Email, money) {
    return axios({
        method: 'post',
        url: URL + USER + CREATE,
        headers: {
            'Content-Type': 'application/json'
        },
            data: {
                username: Username,
                password: Password,
                first_name: First_name,
                last_name: Last_name,
                user_type: User_type,
                email: Email,
                account_balance: money
            }
        })
        .then(function (response) {
            console.log(response.data)
            alert("Sending request to admin")
        })
        .catch((error) => {
            alert(error)
        })
}

//Accept user from admin
export function acceptUser(token,userID) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            enabled: true
        }
    })
}

export function blacklistUser(token, userID) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            blacklisted: true
        }
    })
}

export function rejectUser(token, userID, reject_reason) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            blacklisted: true,
            admin_message: reject_reason
        }
    })
}

export function accounts(token) {
    return axios({
        method: 'get',
        url: URL + USER + ACCOUNTS,
        headers: {
            'x-access-token': token
        }
    })
}

export function deleteUser(token, userID) {
    return axios({
        method: 'delete',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        }
    })
}

export function firstLoggedIn(token, userID) {
    return axios({
        method: 'put',
        url: URL + USER + ME,
        headers: {
            'x-access-token': token
        },
        data: {
            first_login: false
        }
    })
}

export function updateMe(token, github, linkedIn) {
    return axios({
        method: 'put',
        url: URL + USER + ME,
        headers: {
            'x-access-token': token
        },
        data: {
            github: github,
            linkedIn: linkedIn
        }
    })
}

//Check user password
export function checkUser(password) {
    return axios({
        method: 'post',
        url: URL + USER + CHECK,
        data: {
            password: password
        }
    })
}