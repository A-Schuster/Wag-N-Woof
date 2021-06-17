import React from "react"
import { useDispatch } from "react-redux";
import { View, Platform } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import Login from "../Login";
import Constants from "expo-constants";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { Home } from "../Home";
import { fetchUsers, verifyUser } from "../../redux/ActionCreators";
import SignUp from "../SignUp";

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'lightblue'
      },
      headerTintColor: 'blue',
      headerTitleStyle: {
        color: 'lightpink'
      }
    }
  }
)
const LoginStack = createStackNavigator(
  {
    Login: { screen: Login},
    SignUp: { screen: SignUp},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'lightblue'
      },
      headerTintColor: 'blue',
      headerTitleStyle: {
        color: 'lightpink'
      }
    }
  }
)

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator }
  },
  {
    drawerBackgroundColor: "grey"
  }
)

const AppNavigator = createAppContainer(MainNavigator)
const LoginNavigator = createAppContainer(LoginStack)


export const Main = () => {

  const dispatch = useDispatch()
  dispatch(fetchUsers())
  
  const isLogged = false

  return(
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}>
      <>
        {!isLogged && <LoginNavigator/>}
      </>
      <>
        {isLogged && <AppNavigator/>}
      </>
    </View>
  )
}

export default Main