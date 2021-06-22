import React from "react"
import { FlatList } from "react-native"
import { ListItem } from "react-native-elements"

const Messages = ({user,users,navigation}) => {

  const latestMessage = (conversation) => {
    const sorted  = conversation.received.sort((a,b) => {
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
    console.log(sorted)
    return sorted[0]
  }
  
  const getFromUser = (fromUser) => {
    const filtered = users.filter(indUser => indUser.username === fromUser.toString())
    return filtered[0]
  }
  
  const MessageComponent = ({item}) => {
    const fromUser = getFromUser(item.from)
    const mostRecentMessage = latestMessage(item.conversation)
    // console.log(`From User: ${JSON.stringify(latestMessage(item.conversation))}`)
    return(
      <ListItem onPress={() => navigation.navigate('Conversation', { fromUser: fromUser, conversation: item.conversation}) }>
        <ListItem.Title>{fromUser.username}</ListItem.Title>
        <ListItem.Subtitle>{mostRecentMessage.info.content}</ListItem.Subtitle>
      </ListItem>
    )
  }
  
  return(
    <FlatList
      data={user.messages}
      renderItem={MessageComponent}
      keyExtractor={item => item.id.toString()}
    />
  )
}

export default Messages