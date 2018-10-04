import { combineReducers } from 'redux';
import columns from './columns';
import cardPopup from './cardPopup';
import user from './user'
import dndCard from './dndCard'
import dndColumn from './dndColumn'

export default combineReducers({
	columns,
	cardPopup,
  dndCard,
  dndColumn,
	user
});
