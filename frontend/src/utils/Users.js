import axios from 'axios'
import { URL, USER, ACCOUNTS, CREATE } from '../urls/API'

//Register user
export function register(Username, Password, First_name, Last_name, User_type, Email) {
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
      email: Email
    }
  }).then(function(response) {
    console.log(response.data)
    alert("Sending request to admin")
  }).catch((error) => {
    alert(error)
  })
}

//Accept user from admin 
export function acceptUser(userID) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        data : {
            enabled:true
        }
    })
}

export function blacklistUser(userID) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        data : {
            blacklisted:true
        }
    })
}

export function rejectUser(userID, reject_reason) {
    return axios({
        method: 'put',
        url: URL + USER + userID,
        data : {
            blacklisted:true,
            admin_message: reject_reason
        }
    })
}

export function accounts() {
    return axios({
        method: 'get',
        url: URL + ACCOUNTS
    })
}

export function deleteUser(userID) {
    return axios({
        method: 'delete',
        url: URL + USER + userID
    })
}
