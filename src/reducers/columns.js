import {SAVE_CARD} from './../actions/columns'
// import update from 'react-addons-update';
// import initialState from './../data/initialState';


export default function columns(store = {}, action) {

    switch (action.type) {
        case SAVE_CARD:
            console.log(store);
            console.log('dispatch action columns', action.payload);
            return store;
        /*return update(store, {
            isLoading: {$set: true},
        });*/
        default:
            return store;
    }
};