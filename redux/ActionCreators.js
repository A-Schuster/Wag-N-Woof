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
    alert(error)
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

export const addUser = (user) => (dispatch,getState) => {
  dispatch(fetchingUsers())
  if(getState().users.users.filter(prevUser => prevUser.username === user.username).length >= 1){
    alert("Username/Email is already in use")
  }
  else{
    return fetch( baseUrl + "users",{
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(() => dispatch(fetchUsers()))
  }
}

export const postMessageToUser = (message,user,toUser) => {
  if(user.messages.filter(message => message.from === toUser.username).length <= 0){
    const newConversation = {
      id: user.messages.length + 1,
      from: toUser,
      conversation: message,
    }
    return fetch(baseUrl + 'users/' + user.id,{
      method: "PATCH",
      body: JSON.stringify({
        ...user,
        messages: [...user.messages, user.messages.concat(newConversation)]
      }),
      headers:{
        "Content-type": "application/json"
      }
    })
    .then(response => console.log(response))
  }
  if(user.messages){
    const previousConversation = {...user.messages.filter(m => m.from === toUser.username)[0]}
    previousConversation.conversation.push(message)
    return fetch(baseUrl + 'users/' + user.id,{
      method: "PATCH",
      body: JSON.stringify({
        ...user,
        messages: [...user.messages.filter(m => m.from !== toUser.username),{...previousConversation}]
      }),
      headers:{
        "Content-type": "application/json"
      }
    })
  }
  else{
    const newConversation = {
      id: 1,
      from: toUser,
      conversation: message,
    }
    return fetch(baseUrl + 'users/' + user.id,{
      method: "PUT",
      body: JSON.stringify({
        ...user,
        messages: [newConversation]
      }),
      headers:{
        "Content-type": "application/json"
      }
    })
    .then(response => console.log(response))
  }
}

export const postMessage = (message,toUser) => (dispatch,getState) => {
  dispatch(postMessageToUser(message,getState().user.user,toUser))
  dispatch(postMessageToUser(message,toUser,getState().user.user))
  dispatch(getMessages(getState().user.user.messages))
}

export const getMessages = (messages) => ({
  type: ActionTypes.ADD_MESSAGES,
  payload: messages
})

export const addMessage = (message) => ({
  type: ActionTypes.ADD_MESSAGE,
  payload: message
})

export const deleteMessage = (messageId,user,toUser) => dispatch => {
  const messages = user.messages.filter(message => message.from === toUser.username)[0]
  const updatedMessages = {
    ...messages,
  }
  // dispatch(setMessages(updatedMessages))
  
  //   return fetch(baseUrl + "users/" + user.id, {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       ...user,
  //       messages: updatedMessages
  //     }),
  //     headers:{
  //       "Content-type": "application/json"
  //     }
  //   })
  console.log(updatedMessages)
}

export const setMessages = (messages) => ({
  type: ActionTypes.DELETE_MESSAGE,
  payload: messages
})