import React, {useState} from 'react'
import { ScrollView, FlatList, Text } from 'react-native'

export const Conversation = ({route}) => {
  const {conversation, fromUser} = route.params

  const renderConversation = ({item}) => {
    return(
      <>
        <Text>{item.info.content}</Text>
        <Text>{item.info.date}</Text>
      </>
    )
  }

  return(
    <ScrollView>
      <FlatList 
        data={conversation.reverse()}
        renderItem={renderConversation}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  )
}

export default Conversation