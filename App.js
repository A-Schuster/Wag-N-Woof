import React from 'react';
import { Provider } from 'react-redux'
import Main from './components/Main'
import { ConfigureStore } from './redux/ConfigureStore'
import { LogBox } from 'react-native';



const store = ConfigureStore()

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return(
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}
