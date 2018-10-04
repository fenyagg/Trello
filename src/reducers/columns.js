import {SAVE_CARD} from './../actions/columns'
import columnsData from '../data/columns'

export default function columns(store = columnsData, action) {
    switch (action.type) {
        case SAVE_CARD:
            console.log(store);
            console.log('dispatch action SAVE_CARD', action.payload);
            return store;
        /*return update(store, {
            isLoading: {$set: true},
        });*/
        default:
            return store;
    }
};
