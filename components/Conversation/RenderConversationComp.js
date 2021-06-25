import React, { useState, useEffect, useRef } from 'react'
import { ListItem,Avatar } from 'react-native-elements'

export const RenderConversation = ({item,user}) => {
  const [date, showDate] = useState(false)
  const timer = useRef(null)

  const toggleDate = () => {
    showDate(!date)
    timer.current
  }
  useEffect(() => {
    timer.current = setTimeout(() => {
      showDate(false)
    }, 4000)
    return () => {
      clearTimeout(timer.current)
    }
  },[])
  
  if(item.sentBy !== user.username){
    return(
      <ListItem onPress={toggleDate} style={{backgroundColor: "gray"}} >
      <Avatar source={{uri: "https://randomuser.me/api/portraits/lego/6.jpg"}}/>
      <ListItem.Content>
          <ListItem.Title >{item.info.content}</ListItem.Title>
          {date && <ListItem.Subtitle>{item.info.date}</ListItem.Subtitle>}
        </ListItem.Content>
    </ListItem>
    )
  }
  return(
    <ListItem onPress={toggleDate} style={{backgroundColor: "gray"}} >
      <ListItem.Content style={{alignItems: 'flex-end'}}>
          <ListItem.Title >{item.info.content}</ListItem.Title>
          {date && <ListItem.Subtitle>{item.info.date}</ListItem.Subtitle>}
        </ListItem.Content>
    </ListItem>
  )
}

export default RenderConversation