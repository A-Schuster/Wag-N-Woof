import { baseUrl } from '../shared/baseUrl';
import * as ActionTypes from './ActionTypes';

export const fetchingUsers = () => ({
  type: ActionTypes.FETCHING_USERS,
})

export const fetchedUsers = (users) => ({
  type: ActionTypes.FETCHED_USERS,
  payload: users
})

export const usersFailed = (errMess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errMess
})

export const fetchUsers = () => dispatch => {
  dispatch(fetchingUsers())
  return fetch(baseUrl + 'users')
  .then(response => {
    if(response.ok){
      return response
    }
    else{
      const error = new Error(`Error ${response.status}: ${response.statusText}`)
      error.response = response
      throw error
    }
  },
  error => {
    const errMess = new Error(error.message)
    throw errMess
  })
  .then(response => response.json())
  .then(users => dispatch(fetchedUsers(users)))
  .catch(errMess => dispatch(usersFailed(errMess)))
}

export const verifyUser = user => (dispatch,getState) => {
  dispatch(searchingUsers())
  const users = getState().users.users
  const filtered = users.filter(indUser => user.username === indUser.username && user.password === indUser.password)
  if(filtered.length === 1){
    dispatch(setCurrentUser(filtered[0]))
  }
  else{
    const error = new Error('User was either not found or incorrect password.')
    throw error
  }
}

export const logoutUser = () => ({
  type: ActionTypes.USER_LOGOUT,
  payload: {}
})

export const searchingUsers = () => ({
  type: ActionTypes.SEARCHING_USERS
})

export const setCurrentUser = (user) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: user
})