import columns from './columns';

export default {
	columns,
	cardPopup: {
		isOpen: false,
		columnIndex: -1,
		cardIndex: -1,
	},
	user: {
		id: '',
		name: '',
		login: '',
		password: '',
	},
	draggedCardColumnIndex: -1,
	draggedCardIndex: -1,
	draggedColumn: -1,
	isAuthorized: true,
}