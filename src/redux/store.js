import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'


const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// initial state of the app
const initialState = {}
  
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
))


export default store