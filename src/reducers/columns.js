import {START_TASK_LOADING, SUCCESS_TASK_LOADING, ERROR_TASK_LOADING} from './../actions/columns'
import update from 'react-addons-update';
import initialState from './../data/initialState';


export default function columns( store = {}, action) {
	return store;

	/*console.log(store);
	console.log('dispatch action', action);*/
	switch (action.type) {
		case START_TASK_LOADING:
			return update(store, {
				isLoading: { $set: true },
			});
		case SUCCESS_TASK_LOADING:
			return update(store, {
				isLoading: { $set: false },
			});
		case ERROR_TASK_LOADING:
			return update(store, {
				isLoading: { $set: false },
			});
		default:
			return store;
	}
};