import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { View, Platform, Text } from "react-native"
import Constants from "expo-constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { fetchUsers, logoutUser, } from "../../redux/ActionCreators";
import { Home } from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Messages from "../Messages";
import Menu from "../Menu"
import Conversation from "../Conversation/Index";


const Tab = createMaterialTopTabNavigator()

const MyTabs = ({user}) => {
  const users = useSelector(state => state.users.users)
  const MessageCompWProps = props => (
    <MessagesStack user={user} users={users}/>
  )
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Messages" component={MessageCompWProps}/>
      <Tab.Screen name="Menu" component={Menu}/>
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

const MessagesStack = ({user,users}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}}  name={"Messages"} component={({navigation}) => <Messages navigation={navigation} users={users} user={user}/>} />
      <Stack.Screen name={"Conversation"} options={({ route }) => ({ title: route.params.fromUser.username.toUpperCase()})} component={Conversation} />
    </Stack.Navigator>
  )
}


const LoginStack = createStackNavigator()

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
    <LoginStack.Screen name="SignUp" component={SignUp} />
  </LoginStack.Navigator>
)


export const Main = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  
  const isLogged = user.username ? true : false

  return(
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}>
        {!isLogged && 
        <NavigationContainer>
          <LoginStackScreen/>
        </NavigationContainer>
        }
        {
          isLogged && 
          <>
            <NavigationContainer>
              <MyTabs user={user} />
            </NavigationContainer>
          </>
        }
    </View>
  )
}

export default Main