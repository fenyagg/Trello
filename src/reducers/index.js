import { combineReducers } from 'redux';
import columns from './columns';
import cardPopup from './cardPopup';

export default combineReducers({
	columns,
	cardPopup
});