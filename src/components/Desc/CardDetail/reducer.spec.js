
import cardPopupReducer from '../../../reducers/cardPopup'
import * as cardPopupActions from '../../../actions/cardPopup'

describe('card popup reducer', function () {
  it('Тест открытия popup окна', () => {
    const action = cardPopupActions.openCardPopup({ columnIndex: 0, cardIndex: 0 })
    expect(cardPopupReducer(undefined, action)).toEqual({
      cardIndex: 0,
      columnIndex: 0,
      isOpen: true
    })
  })
})
