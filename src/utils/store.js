
import { createStore, applyMiddleware } from 'redux'
import initReducers from '../store'
import middlewares from './../middlewares'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

function iniStore (additionalMiddlewares = []) {
  return createStore(
    initReducers,
    {},
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, ...additionalMiddlewares, ...middlewares)
    )
  )
}

export default iniStore
