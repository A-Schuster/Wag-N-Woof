import React from 'react';
import { View, Text, FlatList} from 'react-native'
import { ListItem } from 'react-native-elements'
import { useSelector } from 'react-redux';
import Messages from '../Messages';



export const Home = () => {
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Messages/>
    </View>
  )
}