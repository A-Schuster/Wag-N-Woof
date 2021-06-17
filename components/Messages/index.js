import React from "react"
import { FlatList } from "react-native"
import { ListItem } from "react-native-elements/dist/list/ListItem"
import { useSelector } from "react-redux"

const latestMessage = (conversation) => {
  const sorted  = conversation.sort((a,b) => {
    if(a.info.date > b.info.date){
      return 1
    }
    else if(b.info.date > a.info.date){
      return -1
    }
    else{
      return 0
    }
  })
  return sorted
}

const getFromUser = (user) => {
  const users = useSelector(state => state.users.users)
  const filtered = users.filter(indUser => indUser.username === user)
  return filtered[0]
}

const MessageComponent = (message) => {
  const fromUser = getFromUser(message.from)
  return(
    <ListItem
    title={fromUser.firstName}
    subtitle={latestMessage(message.conversation)}
    />
  )
}

const Messages = () => {
  const user = useSelector(state => state.user.user)
  return(
    <FlatList
      data={user.messages}
      renderItem={MessageComponent}
      keyExtractor={item => item.id.toString()}
    />
  )
}

export default Messages