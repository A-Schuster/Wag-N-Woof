import * as ActionTypes from './ActionTypes';

export const User = (state = {errMess: null, isLoading: true, user: {}}, action) => {
  switch(action.type){
    case ActionTypes.USER_LOGOUT:
      return {...state, user: {}, isLoading: false, errMess: null }
    case ActionTypes.SEARCHING_FAILED:
      return {...state, user: {}, isLoading: false, errMess: action.payload}
    case ActionTypes.SET_CURRENT_USER:
      return {...state, user: action.payload, errMess: null, isLoading: false}
    case ActionTypes.SEARCHING_USERS:
      return {...state, isLoading: true}
    default:
      return state;
  }
}