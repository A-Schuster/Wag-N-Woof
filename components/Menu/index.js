import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/ActionCreators';

const Menu = ({navigation}) => {
  const dispatch = useDispatch()
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
      <View style={{margin: 10}}>
        <Button onPress={() => dispatch(logoutUser())} title="Logout"/>
      </View>
      <View style={{margin: 10}}>
        <Button onPress={() => navigation.navigate("AccountSettings")} title="Account Settings"/>
      </View>
    </View>
  )
}

export default Menu