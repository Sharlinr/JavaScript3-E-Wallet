import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  activeCard: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      if (state.cards.length < 4) {
        state.cards.push(action.payload);
      }
    },
    updateCard: (state, action) => {
      const { id, updatedCard } = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === id);
      if (cardIndex >= 0) {
        state.cards[cardIndex] = updatedCard;
      }
    },

    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },

    activateCard: (state, action) => {
      state.card.forEach((card) => card.id === action.payload);
      if (cardIndex >= 0) {
        state.cards[cardIndex].isActive = true;
        state.activeCard = state.cards[cardIndex];
      }
    },
  },
});

export const { addCard, updateCard, deleteCard, activateCard } =
  cardSlice.actions;

export default cardSlice.reducer;
