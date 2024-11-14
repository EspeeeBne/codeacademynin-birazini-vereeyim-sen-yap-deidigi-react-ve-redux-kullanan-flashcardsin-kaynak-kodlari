import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: {}
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { id, front, back } = action.payload;
      state.cards[id] = {
        id,
        front,
        back
      };
    },
    removeCard: (state, action) => {
      const { cardId } = action.payload;
      delete state.cards[cardId];
    }
  }
});

export const { addCard, removeCard } = cardsSlice.actions;
export const selectCard = (state, id) => state.cards.cards[id];
export default cardsSlice.reducer;