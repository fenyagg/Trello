import * as cardPopupActions from './../../actions/cardPopup'

describe('card popup action', function () {
  it('Тест action card popup', () => {

    const result = {
      columnIndex: 1,
      cardIndex: 1
    }

    expect(cardPopupActions.openCardPopup(result)).toEqual({
      type: cardPopupActions.OPEN_CARD_POPUP,
      payload: result
    })
  })
})
