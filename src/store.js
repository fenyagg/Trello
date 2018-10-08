/**
 * test file
 * todo delete this file
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import middleWares from './middlewares'


const tasksReducer = ( store = {taskList: []}, action) => {
	switch (action.type) {
		case 'add':
			return {taskList: [action.addItem, ...store.taskList]};
		default:
			return store;
	}
};

const initialStore = {};

const reducer = combineReducers({
	tasks: tasksReducer
});

const logger1 = store => next => action => {
	const result = next(action);
	return result;
};


const store = createStore(
	reducer,
	initialStore,
	compose(
		applyMiddleware(logger1),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);


store.subscribe(
	() => {
		//console.log('subscriber 1', store.getState());
	}
);

store.dispatch({
	type: 'add',
	addItem: '1'
});
export default store;
