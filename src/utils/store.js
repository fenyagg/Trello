
import { createStore, applyMiddleware, compose} from 'redux';
import initReducers from './../reducers';
import middlewares from './../middlewares';
import initialState from './../data/initialState';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

function iniStore( additionalMiddlewares = [] ) {
	return createStore(
		initReducers,
		{},
    composeWithDevTools(
			applyMiddleware(thunkMiddleware, ...additionalMiddlewares, ...middlewares)
		)
	);
}

export default iniStore;
