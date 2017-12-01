import axios from 'axios'
import { URL, USER, ACCOUNTS, UPDATE } from '../urls/API'

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

export function accounts() {
    return axios({
        method: 'get',
        url: URL+ACCOUNTS
    })
}