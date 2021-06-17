import * as ActionTypes from "./ActionTypes"

export const Users = (state = {errMess: null, isLoading: true, users: []}, action) => {
  switch(action.type){
    case ActionTypes.USERS_FAILED:
      return {...state, isLoading: false, users: [], errMess: action.payload}
    case ActionTypes.FETCHING_USERS:
      return {...state, isLoading: true}
    case ActionTypes.FETCHED_USERS:
      return {...state, isLoading: false, users: action.payload, errMess: null}
    default:
      return state;
  }
}