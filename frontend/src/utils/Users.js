import axios from 'axios'
import {HISTORY, URL, USER, ACCOUNTS, CREATE, ME, CHECK, SEARCH, MONEY_REQUEST, FILE, DOC, PIC,
    TOTAL_CLIENTS, TOTAL_DEV, TOP_CLIENT, TOP_DEV, PROTEST, WARNING} from '../urls/API'
import FormData from 'form-data'

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
            if(error.request.status === 500) {
                alert("Username already exists")
            } else {
                alert(error)
            }
        })
}

//Accept user from admin
export function acceptUser(token,userID) {
    console.log(userID, token)
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

//Check first login
export function updateMe(token, github, linkedIn, resume) {

    var formData = new FormData();

    return axios({
        method: 'put',
        url: URL + USER + ME,
        headers: {
            'x-access-token': token
        },
        data: {
            github: {value: github},
            linkedIn: {value: linkedIn},
            resume: resume
        }
    })
}

export function updateSettings(token, data) {
    return axios({
        method: 'put',
        url: URL + USER + ME,
        headers: {
            'x-access-token': token
        },
        data: data
    })
}

//Check user password
export function checkUser(token, password) {
    return axios({
        url: URL + USER + CHECK,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: {
            password: password
        }
    })
}

//Search user
export function searchUser(username) {
    return axios({
        method: 'get',
        url: URL + USER + SEARCH + username,
        headers: {
            "Content-Type" :"application/json"
        }
    })
}

export function history(username) {
    return axios({
        method: 'get',
        url: URL + USER + HISTORY + username,
        headers: {
            "Content-Type" : "application/json"
        }
    })
}

export function topDev() {
    return axios({
        method: 'get',
        url: URL + USER + TOP_DEV
    })
}

export function topClient() {
    return axios({
        method: 'get',
        url: URL + USER + TOP_CLIENT
    })
}

export function numberOfDev() {
    return axios({
        method: 'get',
        url: URL + USER + TOTAL_DEV
    })
}

export function numberOfClients() {
    return axios({
        method: 'get',
        url: URL+USER+TOTAL_CLIENTS
    })
}

export function moreMoney(token, money_amt, userID) {
    return axios({
        method: 'put',
        url: URL + USER + MONEY_REQUEST + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            money_amt: money_amt
        }
    })
}

export function approveMoney(token, userID, new_account_balance) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            req_money: 0, 
            account_balance: new_account_balance
        }
    })
}

export function disapproveMoney(token, userID) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            req_money: 0
        }
    })
}

export function protestWarning(token, userID, protestMSG) {
    return axios({
        method: 'put',
        url: URL + PROTEST + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            message: protestMSG
        }
    })
}

export function changeWarning(token, userID, warning) {
    return axios({
        method: 'put',
        url: URL + PROTEST + WARNING + userID,
        headers: {
            'x-access-token': token
        },
        data: {
            warning: warning
        }
    })
}

export function resumeUpload(token, file) {

    console.log(file)
    let data = new FormData()
    data.append('file', file)

    return axios.post(URL + FILE + DOC, data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'x-access-token': token
        }
    })
}

export function pictureUpload(token, picture) {

    console.log(picture)
    let data = new FormData()
    data.append('file', picture)

    return axios.post(URL + FILE + PIC, data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'x-access-token': token
        }
    })
}