import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'
import { Users } from './Users';
import { InitialDogForm, InitialUserForm, InitialLoginForm } from './Forms'


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users: Users,
      ...createForms({
        // userCreationForm: InitialUserForm,
        dogCreationForm: InitialDogForm,
      })
    }),
    applyMiddleware(thunk, logger)
  )

  return store
}