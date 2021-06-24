import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScrollView, View, Button } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import RenderConversation from './RenderConversationComp'
import { postMessage } from '../../redux/ActionCreators'




export const Conversation = ({route}) => {
  const {conversation, fromUser} = route.params
  const [currentMessage, setCurrentMessage] = useState(null)
  const dispatch = useDispatch()

  const sendMessage = () => {
    const newMessage = {
      id: conversation.length + 1,
      info: {
        date: new Date(),
        time: "12:00:00",
        content: currentMessage
      },
      received: false
    }
    dispatch(postMessage(newMessage,fromUser))
  }

  return(
    <View>
      <ScrollView>
        {conversation.map(message => <RenderConversation key={message.id} item={message}/>)}
      </ScrollView>
      <View style={{flexDirection: "row"}} style={{justifyContent: "flex-end"}}>
        <Input onChangeText={text => setCurrentMessage(text)} placeholder="New Message" rightIcon= {<Icon onPress={sendMessage} name="message"/>} />
      </View>
    </View>
  )
}

export default Conversation