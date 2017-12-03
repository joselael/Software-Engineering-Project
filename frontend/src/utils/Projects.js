import axios from 'axios'
import {
  URL,
  PROJECTS,
  CREATEPROJECTS
} from '../urls/API'

export function projects() {
  return axios({
    method: "get",
    url: URL + PROJECTS
  })
}

export function createprojects(username, summary, bid_end, min_budget, max_budget) {
  return axios({
    method: 'post',
    url: URL + CREATEPROJECTS,
    data: {
      author: username,
      summary: summary,
      bid_end,
      bid_end,
      min_budget: min_budget,
      max_budget: max_budget
    }
  })
}