import React, { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { FlatList } from "react-native"
import { ListItem } from "react-native-elements"
import { getMessages } from "../../redux/ActionCreators"

const Messages = ({user,users,navigation}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMessages(user.messages))
  },[])
  const messages = useSelector(state => state.messages.messages)

  const latestMessage = (conversation) => {
    const sorted  = conversation.sort((a,b) => {
      if(a.info.date > b.info.date){
        return -1
      }
      else if(b.info.date > a.info.date){
        return 1
      }
      else{
        return 0
      }
    })
    return sorted[0]
  }
  
  const getFromUser = (fromUser) => {
    const filtered = users.filter(indUser => indUser.username === fromUser.toString())
    return filtered[0]
  }
  
  const MessageComponent = ({item}) => {
    const fromUser = getFromUser(item.from)
    const mostRecentMessage = latestMessage(item.conversation)
    return(
      <ListItem onPress={() => navigation.navigate('Conversation', { fromUser: fromUser, user: user, conversation: item.conversation}) }>
        <ListItem.Title>{item.from}</ListItem.Title>
        <ListItem.Subtitle>{mostRecentMessage.info.content}</ListItem.Subtitle>
      </ListItem>
    )
  }
  
  return(
    <FlatList
      data={messages}
      renderItem={MessageComponent}
      keyExtractor={item => item.id.toString()}
    />
  )
}

export default Messages