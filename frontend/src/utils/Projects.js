import axios from 'axios'
import {
  URL,
  PROJECT,
  PROJECTS,
  CREATE,
} from '../urls/API'

export function projects() {
  return axios({
    method: "get",
    url: URL + PROJECT + PROJECTS
  })
}

export function myproject(username) {
  return axios({
    method: "get",
    url: URL + PROJECT + username
  })
}

export function createprojects(title, username, summary, bid_end, min_budget, max_budget) {
  return axios({
    method: 'post',
    url: URL + PROJECT + CREATE,
    data: {
      title: title,
      author: username,
      summary: summary,
      bid_end: bid_end,
      min_budget: min_budget,
      max_budget: max_budget
    }
  })
}
