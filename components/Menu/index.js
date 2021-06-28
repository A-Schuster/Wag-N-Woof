import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/ActionCreators';
import appColors from '../../shared/colors';

const Menu = ({navigation}) => {
  const dispatch = useDispatch()
  return(
    <View style={styles.view}>
      <View style={styles.buttonView}>
        <Button onPress={() => dispatch(logoutUser())} title="Logout"/>
      </View>
      <View style={styles.buttonView}>
        <Button onPress={() => navigation.navigate("AccountSettings")} title="Account Settings"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: 'center'
  },
  buttonView: {
    margin: 10,
    color: appColors.ternary.main
  }
})

export default Menu