import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Keyboard, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { Input,Icon } from 'react-native-elements'
import appColors from '../../shared/colors'
import { addUser } from '../../redux/ActionCreators'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export const SignUp = () => {
  const dispatch = useDispatch()
  const usernameInput = useRef()
  const firstInput = useRef()
  const lastInput = useRef()
  const emailInput = useRef()
  const passwordInput = useRef()
  useEffect(() => {
    firstInput.current.focus()
  },[])

  const handleSubmit = () => {
    const newUser = {
      firstName: firstInput.current.value,
      lastName: lastInput.current.value,
      email: emailInput.current.value,
      username: usernameInput.current.value,
      password: passwordInput.current.value
    }
    dispatch(addUser(newUser))
  }

  return(
    <KeyboardAwareScrollView >
        <View style={styles.view}>
          <Input ref={firstInput} onSubmitEditing={() => lastInput.current.focus()} inputContainerStyle={{borderBottomWidth: 0}} style={styles.inputs} placeholder="First Name"/>
          <Input ref={lastInput} onSubmitEditing={() => emailInput.current.focus()} onChangeText={text => lastInput.current.value = text} inputContainerStyle={{borderBottomWidth: 0}} style={styles.inputs} placeholder="Last Name"/>
          <Input ref={emailInput} onSubmitEditing={() => usernameInput.current.focus()} onChangeText={text => emailInput.current.value = text} inputContainerStyle={{borderBottomWidth: 0}} style={styles.inputs} placeholder="Email"/>
          <Input ref={usernameInput} onSubmitEditing={() => passwordInput.current.focus()} onChangeText={text => usernameInput.current.value = text} inputContainerStyle={{borderBottomWidth: 0}}  style={styles.inputs} placeholder="Username"/>
          <Input secureTextEntry={true} onSubmitEditing={() => Keyboard.dismiss()} ref={passwordInput} onChangeText={text => passwordInput.current.value = text} inputContainerStyle={{borderBottomWidth: 0}}  style={styles.inputs} placeholder="Password"/>
          <View style={{padding: 10, width: 150, height: 50, borderRadius: 15 ,backgroundColor: appColors.ternary.light, justifyContent: 'center', alignItems: "center"}} >
              <Text>Create Account</Text>
              <Icon onPress={() => handleSubmit()} name="user-plus" type="font-awesome"  />
            </View>
        </View>
    </KeyboardAwareScrollView>
  )
} 

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 10
  },
  inputs: {
    borderColor: appColors.ternary.dark,
    borderWidth: 4,
    padding: 20,
    borderRadius: 30
  }
})

export default SignUp