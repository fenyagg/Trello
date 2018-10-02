export const SAVE_CARD = 'SAVE_CARD';

export const saveCard = (card) => {
    return {
        type: SAVE_CARD,
        payload: card
    }
};