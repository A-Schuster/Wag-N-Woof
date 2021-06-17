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
import { fetchUsers } from "../../redux/ActionCreators";

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

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator }
  },
  {
    drawerBackgroundColor: "grey"
  }
)

const AppNavigator = createAppContainer(MainNavigator)

export const Main = () => {
  const dispatch = useDispatch()
  dispatch(fetchUsers())
  return(
    <View style={{
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
      }}>
      <AppNavigator/>
    </View>
  )
}

export default Main