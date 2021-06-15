import React from "react"
import { useDispatch } from "redux";
import { View, Text } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import Login from "../Login";

const Main = (props) => {
  const dispatch = useDispatch()
  return(
    <NavigationContainer>
      {!loggedIn && <Login/>}
    </NavigationContainer>
  )
}

export default Main