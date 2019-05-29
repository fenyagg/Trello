import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import middlewares from '../middlewares'
import cardPopup from './cardPopup/reducers'
import columns from './column/reducers'
import dndCard from './dndCard/reducers'
import dndColumn from './dndColumn/reducers'
import user from './user/reducers'

const rootReducer = combineReducers({
  columns,
  cardPopup,
  dndCard,
  dndColumn,
  user
});

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore(additionalMiddlewares = []) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, ...additionalMiddlewares, ...middlewares))
  );

  return store;
}
