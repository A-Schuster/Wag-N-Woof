import React from 'react';
import { Provider } from 'react-redux'
import Main from './components/Main'
import { ConfigureStore } from './redux/ConfigureStore'

const store = ConfigureStore()

export default function App() {
  return(
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}
