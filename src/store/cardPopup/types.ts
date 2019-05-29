
export interface CardPopupState {
    isOpen: boolean,
    columnIndex: number,
    cardIndex: number,
}

export const OPEN_CARD_POPUP = 'OPEN_CARD_POPUP'
export const CLOSE_CARD_POPUP = 'CLOSE_CARD_POPUP'

interface OpenCardPopupAction {
    type: typeof OPEN_CARD_POPUP,
    payload: CardPopupState
}

interface CloseCardPopupAction {
    type: typeof CLOSE_CARD_POPUP,
    isOpen: boolean
}

export type CardPopupTypes = OpenCardPopupAction | CloseCardPopupAction
