import {START_TASK_LOADING, SUCCESS_TASK_LOADING} from './../actions/columns'
import update from 'react-addons-update';

const initialState = {

};

export default function columns( store = initialState, action) {
	console.log('dispatch action', action);
	switch (action.type) {
		case START_TASK_LOADING:
			return update(store, {
				isLoading: { $set: true },
			});
		default:
			return store;
	}
};