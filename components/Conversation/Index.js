import React, { useState, useRef, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { View, Text } from 'react-native'
import { Icon, Input, LinearProgress } from 'react-native-elements'
import RenderConversation from './RenderConversationComp'
import { postMessage } from '../../redux/ActionCreators'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import getFormattedDate from '../../shared/formattedDate'
import { baseUrl } from '../../shared/baseUrl'
import appColors from '../../shared/colors'



export const Conversation = ({route}) => {
  const {fromUser,user} = route.params
  const [updatedFrom, setUpdatedFrom] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const chatInput = useRef()
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages)
  const conversation = messages.messages.filter(m => m.from === fromUser.username)[0].conversation
  
  useEffect(() => {
    const fetchData = async () => {
      return fetch(baseUrl + "users/" + fromUser.id)
      .then(res => res.json())
      .then(user => setUpdatedFrom(user))
    }
    fetchData()
  },[])

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
    dispatch(postMessage(newMessage,updatedFrom))
   }
   chatInput.current.clear()
  }
  if(!updatedFrom){
    return (
      <View style={{flex: 3, alignItems: "center"}}>
        <LinearProgress color={appColors.secondary.light} />
      </View>
    )
  }
  return(
    <View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {conversation.map(message => <RenderConversation user={user} fromUser={fromUser} key={message.id} item={message}/>)}
        {conversation.length < 1 && 
        <View style={{flex: 1, alignItems: "center", padding: 10, borderBottomWidth: 1, borderStyle: 'solid' }}>
          <Text>
            No Messages With This User Yet.
          </Text>
        </View>}
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