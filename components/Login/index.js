import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { View, Text } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import CheckBox from '@react-native-community/checkbox';
import { fetchUsers, verifyUser } from "../../redux/ActionCreators";

const Login = (props) => {
  const [password, setPassword] = useState(null)
  const [username, setUsername] = useState(null)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(fetchUsers())
  },[])

  const handleSubmit = () => {
    const user = ({
      password,
      username
    })
    dispatch(verifyUser(user))
  }

  const { navigate } = props.navigation;
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View style={{padding: 20, alignItems: "center"}}>
        <TextInput autoCompleteType="username" onChangeText={setUsername} id="username" placeholder="Username" />
        <TextInput secureTextEntry={true} autoCompleteType="password" onChangeText={setPassword} id="password" placeholder="Password" />
        <View style={{flexDirection: "row", alignItems: 'center'}}>
          <Text style={{paddingLeft: 25}}>Remember Me</Text>
          <CheckBox/>
        </View>
        <Text onPress={handleSubmit} style={{padding: 20}}>LOGIN</Text>
      </View>
      <Text style={{padding: 20}} onPress={() => navigate("SignUp")}>
        SignUp
      </Text>
    </View>
  )
}



export default Login