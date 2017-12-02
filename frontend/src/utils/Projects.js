import axios from 'axios'
import { URL, PROJECTS } from '../urls/API'

export function projects() {
    return axios({
        method: "get",
        url: URL + PROJECTS
    })
}