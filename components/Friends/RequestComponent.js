import React from "react"
import {View} from "react-native"

export const Requests = ({route}) => {
  const {users,requests} = route.params
  const requestUsernames = requests.map(fr => fr.username)
  const received = users.filter(user => requestUsernames.includes(user.username) && requests.received === true)
  const sent = users.filter(user => requestUsernames.includes(user.username) && requests.received === false)
  alert(JSON.stringify(sent))
  return (
    <View>
      
    </View>
  )
}

export default Requests