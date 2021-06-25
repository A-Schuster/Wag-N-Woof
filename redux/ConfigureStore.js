import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createForms } from 'react-redux-form'
import { Users } from './Users';
import { InitialDogForm, InitialUserForm, InitialLoginForm } from './Forms'
import { User } from './User';
import { Messages } from './Messages';


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users: Users,
      user: User,
      messages: Messages,
      ...createForms({
        // userCreationForm: InitialUserForm,
        dogCreationForm: InitialDogForm,
      })
    }),
    applyMiddleware(thunk, logger)
  )

  return store
}