import { actions } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import getFormattedDate from '../shared/formattedDate';
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

export const postMessageToUser = (message,user,toUser) => () => {
  const previousConversation = {...user.messages.filter(m => m.from === toUser.username)[0]}
  if(user.messages.length >= 1){
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

export const deleteMessage = (messageId,user,toUser) => (dispatch,getState) => {
  const messages = user.messages.filter(message => message.from === toUser.username)[0]
  messages.conversation = messages.conversation.filter(message => message.id !== messageId)
  const updatedMessages = [...user.messages.filter(messages => messages.from !== toUser.username),messages]
  dispatch(deleteMessages(updatedMessages))
  dispatch(getMessages(getState().user.user.messages))
  
  return fetch(baseUrl + "users/" + user.id, {
    method: "PATCH",
    body: JSON.stringify({
      ...user,
      messages: updatedMessages
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const deleteMessages = (messages) => ({
  type: ActionTypes.DELETE_MESSAGE,
  payload: messages
})

export const acceptRequest = (user,fromUser) => (dispatch) => {
  dispatch(putNewFriend(fromUser,user))
  dispatch(putNewFriend(user,fromUser))
  .then(response => response.json())
  .then(user => dispatch(setCurrentUser(user)))
}


export const putNewFriend = (user,fromUser) => () => {
  const newFriend = {
    id: user.friends.length + 1,
    date: getFormattedDate(new Date()),
    username: fromUser.username
  }
  return fetch(baseUrl + "users/" + user.id,{
    method: "PUT",
    body: JSON.stringify({
      ...user,
      friends: user.friends.concat(newFriend),
      friendRequests: user.friendRequests.filter(fr => fr.username !== fromUser.username)
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const removeFriend = (user,fromUser) => (dispatch) => {
  dispatch(deleteFriend(fromUser,user))
  dispatch(deleteFriend(user,fromUser))
  .then(response => response.json())
  .then(user => dispatch(setCurrentUser(user)))
}

export const deleteFriend = (user,fromUser) => () => {
  return fetch(baseUrl + "users/" + user.id,{
    method: "PUT",
    body: JSON.stringify({
      ...user,
      friends: user.friends.filter(friend => friend.username !== fromUser.username)
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const sendRequest = (user,toUser) => (dispatch) => {
  dispatch(postRequest(toUser,user))
  dispatch(postRequest(user,toUser))
  .then(response => response.json())
  .then(user => dispatch(setCurrentUser(user)))
}

export const postRequest = (user,toUser) => (dispatch,getState) => {
  const newRequest = {
    id: user.friendRequests.length + 1,
    username: toUser.username,
    received: getState().user.user.username === user.username ? false : true
  }
  return fetch(baseUrl + "users/" + user.id,{
    method: "PUT",
    body: JSON.stringify({
      ...user,
      friendRequests: user.friendRequests.concat(newRequest)
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const cancelRequest = (user,toUser) => (dispatch) => {
  dispatch(deleteRequest(toUser,user))
  dispatch(deleteRequest(user,toUser))
  .then(response => response.json())
  .then(user => dispatch(setCurrentUser(user)))
}

export const deleteRequest = (user,toUser) => () => {
  return fetch(baseUrl + "users/" + user.id,{
    method: "PUT",
    body: JSON.stringify({
      ...user,
      friendRequests: user.friendRequests.filter(fr => fr.username !== toUser.username)
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const postNewConvoToUser = (user,fromUser) => (dispatch) => {
  const newConversation = {
    id: user.messages.length + 1,
    from: fromUser.username,
    conversation: [],
  }
  return fetch(baseUrl + 'users/' + user.id,{
    method: "PUT",
    body: JSON.stringify({
      ...user,
      messages: user.messages.concat(newConversation)
    }),
    headers:{
      "Content-type": "application/json"
    }
  })
}

export const postNewConvo = (user,fromUser,navigation) => (dispatch) => {
  dispatch(postNewConvoToUser(fromUser,user))
  dispatch(postNewConvoToUser(user,fromUser))
  .then(res => res.json())
  .then(user => {
    dispatch(getMessages(user.messages))
    dispatch(setCurrentUser(user))
  })
  .then(() => navigation.navigate('Conversation', { fromUser: fromUser, user: user}))  
}