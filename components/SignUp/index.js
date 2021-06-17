import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export const SignUp = () => {
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <TextInput style={{padding: 20}} placeholder="First Name"/>
      <TextInput style={{padding: 20}} placeholder="Last Name"/>
      <TextInput style={{padding: 20}} placeholder="Username"/>
    </View>
  )
}

export default SignUp