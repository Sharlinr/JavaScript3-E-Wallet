import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  //activeCard: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const newCard = {
        ...action.payload,
        id: state.cards.length + 1,
        isActive: false,
      };
      if (state.cards.length === 0) {
        newCard.isActive = true;
      }
      state.cards.push(newCard);
    },

    updateCard: (state, action) => {
      const { id, updatedCard } = action.payload;
      const cardIndex = state.cards.findIndex((card) => card.id === id);
      if (cardIndex >= 0) {
        state.cards[cardIndex] = { ...state.cards[cardIndex], ...updatedCard };
      }
    },

    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },

    activateCard: (state, action) => {
      const cardIndex = state.cards.findIndex(
        (card) => card.id === action.payload
      );
      state.cards.forEach((card) => (card.isActive = false));
      if (cardIndex >= 0) {
        state.cards[cardIndex].isActive = true;
        //state.activeCard = state.cards[cardIndex];
      }
    },
  },
});

export const { addCard, updateCard, deleteCard, activateCard } =
  cardSlice.actions;

export default cardSlice.reducer;
