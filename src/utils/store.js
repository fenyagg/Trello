
import { createStore, applyMiddleware, compose} from 'redux';
import initReducers from './../reducers';
import middlewares from './../middlewares';
import columns from './../data/columns';

function iniStore( additionalMiddlewares = [] ) {
	return createStore(
		initReducers,
		{columns: columns},
		compose(
			applyMiddleware(...additionalMiddlewares, ...middlewares),
			window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}

export default iniStore;