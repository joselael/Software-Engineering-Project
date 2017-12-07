import axios from 'axios'
import {
  URL,
  PROJECT,
  PROJECTS,
  CREATE,
  SEARCH
} from '../urls/API'
import store from '../store'

export function deleteProject(PROJECT_ID) {
  return axios({
    method: "delete",
    url: URL + PROJECT + PROJECT_ID,
    headers: {
      "x-access-token": store.getState().token
    }
  })
}

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

export function createprojects(title, username, summary, details, bid_end, max_budget) {
  return axios({
    method: 'post',
    url: URL + PROJECT + CREATE,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": store.getState().token
    },
    data: {
      title: title,
      author: username,
      summary: summary,
      details: details,
      bid_end: bid_end,
      max_budget: max_budget
    }
  })
}
