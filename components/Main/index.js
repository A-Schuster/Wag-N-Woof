import React, { useEffect, useRef } from "react"
import { useDispatch,useSelector } from "react-redux";
import { View, Platform } from "react-native"
import Constants from "expo-constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { fetchUsers, getMessages, } from "../../redux/ActionCreators";
import { Home } from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Messages from "../Messages";
import Menu from "../Menu"
import Conversation from "../Conversation/Index";
import AccountSettings from "../Account";
import { Friends } from "../Friends";


const Tab = createMaterialTopTabNavigator()

const MyTabs = (props) => {
  const users = useSelector(state => state.users.users)
  const navigationRef = useRef(null)
  //"MessageCompWProps is for the following error message"
  //Looks like you're passing an inline function for 'component' prop for the screen 'Messages' (e.g. component={() => <SomeComponent />}). 
  // Passing an inline function will cause the component state to be lost on re-render and cause perf 
  // issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour.
  const MessageCompWProps = () => (
    <MessagesStack user={props.user} users={users}/>
  )
  return(
    <Tab.Navigator ref={navigationRef}>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Messages" component={MessageCompWProps}/>
      <Tab.Screen name="Friends" component={FriendsStack} />
      <Tab.Screen name="Menu" component={MenuStack}/>
    </Tab.Navigator>
  )
}

const MenuStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name={"Menu"} component={Menu}/>
      <Stack.Screen name={"AccountSettings"} component={AccountSettings}/>
    </Stack.Navigator>
  )
}

const FriendsStack = ({navigation}) => {
  console.log(navigation)
  return(
    <Stack.Navigator >
      <Stack.Screen name={"Friends"} component={Friends} />
      <Stack.Screen name={"Conversation"} options={({ route }) => ({ title: route.params.fromUser.username.toUpperCase()})} component={Conversation} />
    </Stack.Navigator>
  )
}

const Stack = createStackNavigator()

const MessagesStack = ({user,users}) => {

  //"MessageCompWProps is for the following error message"
  //Looks like you're passing an inline function for 'component' prop for the screen 'Messages' (e.g. component={() => <SomeComponent />}). 
  // Passing an inline function will cause the component state to be lost on re-render and cause perf 
  // issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour.

  const MessageCompWProps = ({navigation}) => {
    return <Messages navigation={navigation} users={users} user={user}/>
  }
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}}  name={"Messages"} component={MessageCompWProps} />
      <Stack.Screen name={"Conversation"} options={({ route }) => ({ title: route.params.fromUser.username.toUpperCase()})} component={Conversation} />
    </Stack.Navigator>
  )
}


const LoginStack = createStackNavigator()

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen options={{headerTitleAlign: "center"}} name="Login" component={Login} />
    <LoginStack.Screen name="SignUp" component={SignUp} />
  </LoginStack.Navigator>
)


export const Main = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  dispatch(getMessages(user.messages))
  
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