import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      ...createForms({
        userCreationForm: InitialUser,
        dogCreationForm: InitialDog,
      })
    }),
    applyMiddleware(thunk, logger)
  )

  return store
}