
import { createStore, applyMiddleware, compose} from 'redux';
import initReducers from './../reducers';
import middlewares from './../middlewares';
import initialState from './../data/initialState';

function iniStore( additionalMiddlewares = [] ) {
	return createStore(
		initReducers,
		{
			columns: initialState.columns,
			cardPopup: initialState.cardPopup,
		},
		compose(
			applyMiddleware(...additionalMiddlewares, ...middlewares),
			window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}

export default iniStore;