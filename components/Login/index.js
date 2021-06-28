import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { View, Text } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import CheckBox from '@react-native-community/checkbox';
import { verifyUser } from "../../redux/ActionCreators";
import { NetworkInfo } from "react-native-network-info"

const Login = (props) => {
  const [password, setPassword] = useState(null)
  const [username, setUsername] = useState(null)
  const dispatch = useDispatch()


  const handleSubmit = () => {
    const user = ({
      password,
      username
    })
  }

  const { navigate } = props.navigation;
  return(
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View style={{padding: 20}}>
        <TextInput autoCompleteType="username" onChangeText={setUsername} id="username" placeholder="Username" />
        <TextInput secureTextEntry={true} autoCompleteType="password" onChangeText={setPassword} id="password" placeholder="Password" />
        <Text>Remember Me<CheckBox/></Text>
        <Text onPress={handleSubmit} style={{padding: 20}}>LOGIN</Text>
      </View>
      <Text style={{padding: 20}} onPress={() => navigate("SignUp")}>
        SignUp
      </Text>
    </View>
  )
}



export default Login