import * as ActionTypes from "./ActionTypes"

export const Friends = (state = {friends: {}}, action) => {
  switch(action.type){
    case ActionTypes.SET_FRIENDS:
      return {friends: action.payload}
    default:
      return state
  }
}