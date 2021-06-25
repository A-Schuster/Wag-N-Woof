import * as ActionTypes from "./ActionTypes"

export const Messages = (state = {errMess: null, messages: []}, action) => {
  switch(action.type){
    case ActionTypes.ADD_MESSAGES:
      return {...state, errMess: null, messages: action.payload}
    case ActionTypes.ADD_MESSAGE:
      const message = action.payload
      return {...state, errMess: null, messages: state.messages.concat(message)}
    default:
      return state
  }
}