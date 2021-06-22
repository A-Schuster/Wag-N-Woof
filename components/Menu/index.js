import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/ActionCreators';

const Menu = () => {
  const dispatch = useDispatch()
  return(
    <View>
      <Text onPress={() => dispatch(logoutUser())}>
        LOGOUT
      </Text>
    </View>
  )
}

export default Menu