import React from 'react';
import { useSelector } from 'react-redux'
import { View, Text, FlatList } from 'react-native'

const renderUsers = (item) => {
  alert(item)
  return (
    <Text>{item.firstName}</Text>
  )
}


export const Home = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return(
    <View>
      <FlatList 
        data={users.users}
        renderItem={item => renderUsers(item)}
      />
    </View>
  )
}