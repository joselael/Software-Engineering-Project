import axios from 'axios'
import { URL, USER, ACCOUNTS, UPDATE, DELETE } from '../urls/API'

export function acceptUser(userID) {
    return axios({
        method: 'put',
        url: URL + UPDATE + userID,
        data : {
            enabled:true
        }
    })
}

export function blacklistUser(userID) {
    return axios({
        method: 'put',
        url: URL + UPDATE + userID,
        data : {
            blacklisted:true
        }
    })
}

export function rejectUser(userID, reject_reason) {
    return axios({
        method: 'put',
        url: URL + UPDATE + userID,
        data : {
            blacklisted:true,
            admin_message: reject_reason
        }
    })
}

export function accounts() {
    return axios({
        method: 'get',
        url: URL+ACCOUNTS
    })
}

export function deleteUser(userID) {
    return axios({
        method: 'delete',
        url: URL + DELETE + userID
    })
}