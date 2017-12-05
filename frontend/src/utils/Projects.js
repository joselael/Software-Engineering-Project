import axios from 'axios'
import {
  URL,
  PROJECT,
  PROJECTS,
  CREATE,
  SEARCH
} from '../urls/API'
import store from '../store'

export function projects() {
  return axios({
    method: "get",
    url: URL + PROJECT + PROJECTS
  })
}

export function myproject(username) {
  return axios({
    method: "get",
    url: URL + PROJECT + SEARCH + username,
    headers: {
      'x-access-token': store.getState().token
    }
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
