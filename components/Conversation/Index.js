import React, { useState, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { View, Text } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import RenderConversation from './RenderConversationComp'
import { postMessage } from '../../redux/ActionCreators'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import getFormattedDate from '../../shared/formattedDate'



export const Conversation = ({route,navigation}) => {
  const {fromUser,user} = route.params
  const [currentMessage, setCurrentMessage] = useState('')
  const chatInput = useRef()
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages)
  const conversation = messages.messages.filter(m => m.from === fromUser.username)[0].conversation


  const sendMessage = () => {
   if(currentMessage.length >= 1){
    const newMessage = {
      id: conversation.length + 1,
      info: {
        date: getFormattedDate(new Date),
        time: "12:00:00",
        content: currentMessage
      },
      sentBy: user.username
    }
    dispatch(postMessage(newMessage,fromUser))
   }
   chatInput.current.clear()
  }

  return(
    <View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {conversation.map(message => <RenderConversation user={user} fromUser={fromUser} key={message.id} item={message}/>)}
        <View style={{flexDirection: "row"}} style={{justifyContent: "flex-end"}}>
          <Input ref={chatInput} value={currentMessage} onChangeText={text => setCurrentMessage(text)} placeholder="New Message" rightIcon= {
            <View>
              <Text>
              {currentMessage && <Icon onPress={sendMessage} name="message"/>}
              </Text>
            </View>
          } />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Conversation