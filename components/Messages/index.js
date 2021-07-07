import React from "react"
import { useSelector } from "react-redux"
import { FlatList, View,Text } from "react-native"
import { ListItem } from "react-native-elements"
import appColors from "../../shared/colors"

const Messages = ({user,users,navigation}) => {
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
      <ListItem onPress={() => navigation.navigate('Conversation', { fromUser: fromUser, user: user}) }>
        <ListItem.Title>{item.from}</ListItem.Title>
        <ListItem.Subtitle>{mostRecentMessage ? mostRecentMessage.info.content: "No messages to this user yet."}</ListItem.Subtitle>
      </ListItem>
    )
  }

  if(!messages){
    return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 20, backgroundColor: appColors.ternary.main, padding: 10, borderRadius: 30}} >
        No Conversations Started
      </Text>
    </View>
    )
  }
  else{
    return(
      <FlatList
        data={messages}
        renderItem={MessageComponent}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
}


export default Messages