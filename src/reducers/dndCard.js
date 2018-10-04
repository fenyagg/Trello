//import {OPEN_CARD_POPUP, CLOSE_CARD_POPUP, SAVE_CARD_POPUP} from './../actions/cardPopup';
//import update from 'react-addons-update';

const initialStore = {
  cardIndex: '',
  columnIndex: '',
  isDragging: false
}

export default function dndCard( store = initialStore, action) {
  switch (action.type){
    default:
      return store;
  }
}
