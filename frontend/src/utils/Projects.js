import axios from 'axios'
import {
  URL,
  PROJECT,
  USER,
  PROJECTS,
  CREATE,
  SEARCH,
  BID,
  APPROVE,
  RATING,
  PENALIZE_PROJECT
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

export function createprojects(title, username, summary, details, bid_end, project_end, max_budget) {
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
      project_end: project_end,
      max_budget: max_budget
    }
  })
}

export function bid(id, username, amount, description) {
  return axios({
    url: URL + PROJECT + BID + id,
    method: 'post',
    headers :{
      'x-access-token': store.getState().token
    },
    data: {
      author: username,
      author_id: store.getState().user._id,
      amount: amount,
      description: description
    }
  }).then( (response) => {
    console.log(response)
    alert("Submitting bid...")
  }).catch( (err) => {
    alert(err)
    console.log(err)
  })
}

export function getbid(id) {
  return axios({
    url: URL + PROJECT + BID + id,
    method: 'get',
    headers: {
      'x-access-token': store.getState().token
    }
  })
}

export function finishProject(id) {
  return axios({
    url: URL + PROJECT + id,
    method: 'put',
    headers: {
      'x-access-token': store.getState().token
    },
    data: {
      completed: true,
      require_rating: true
    }
  })
}

export function submitRating(id, data) {
  return axios({
    method: 'put',
    url: URL + PROJECT + RATING + id,
    headers: {
      'x-access-token': store.getState().token
    },
    data: data
  })
}


export function submitAssignee(id, bid_id, assignee, assignee_username,reason_for_selection) {
  return axios({
    method: 'put',
    url: URL + PROJECT + id,
    headers: {
      'x-access-token': store.getState().token
    },
    data: {
      assignee: {
        user_id: assignee,
        username: assignee_username,
        bid_id: bid_id
      },
      reason_for_selection, reason_for_selection,
      require_review: true
    }
  })
}

export function approveProject(id) {
  return axios({
    method: 'put',
    url: URL + PROJECT + APPROVE + id,
    headers: {
      'x-access-token': store.getState().token
    }, 
    data: {
      require_review: false,
      bidding_in_progress: false
    }
  })
}

export function updateProject(id, data) {
  return axios({
    method: 'put',
    url: URL + PROJECT + id,
    headers: {
      'x-access-token': store.getState().token
    },
    data: data
  })
}

export function penalizeUser(id, comments, penalty, admin_rating) {
  return axios({
    method: 'put',
    url: URL + PROJECT + PENALIZE_PROJECT + id,
    headers: {
      'x-access-token': store.getState().token
    },
    data: {
      "admin_comments": comments,
      "penality" : penalty,
      "admin_rating": admin_rating
    }
  })
}

export function rateClient(id, rating) {
  return axios({
    method: 'put',
    url: URL + PROJECT + "rate_client/" + id,
    headers: {
      'x-access-token': store.getState().token
    },
    data: {
      rating: rating
    }
  })
}