import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { ScrollView, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import RenderConversation from './RenderConversationComp'
import { postMessage } from '../../redux/ActionCreators'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




export const Conversation = ({route}) => {
  const {fromUser,user} = route.params
  const [currentMessage, setCurrentMessage] = useState('')
  const dispatch = useDispatch()
  const conversation = useSelector(state => state.messages.messages.filter(m => m.from === fromUser.username)[0].conversation)

  const getFormattedDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    let day = date.getDate().toString();

    month = month.length > 1 ? month : '0' + month;
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  }

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
    setCurrentMessage('')
   }
  }

  return(
    <View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {conversation.map(message => <RenderConversation user={user} key={message.id} item={message}/>)}
        <View style={{flexDirection: "row"}} style={{justifyContent: "flex-end"}}>
          <Input value={currentMessage} onChangeText={text => setCurrentMessage(text)} placeholder="New Message" rightIcon= {<Icon onPress={sendMessage} name="message"/>} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Conversation