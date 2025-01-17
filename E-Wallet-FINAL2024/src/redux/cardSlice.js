import { createSlice } from "@reduxjs/toolkit";
import { getFormErrors } from "../utils/validationHelpers";

const initialState = {
  cards: [],
  isEditMode: false,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const newCard = {
        ...action.payload,
        id: state.cards.length + 1,

        isActive: state.cards.length === 0 ? true : false, //Ny kod
      };

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
      }
    },

    deleteInactiveCards: (state) => {
      state.cards = state.cards.filter((card) => card.isActive);
    },
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
  },
});

export const {
  addCard,
  updateCard,
  deleteCard,
  activateCard,
  deleteInactiveCards,
  setEditMode,
} = cardSlice.actions;

export default cardSlice.reducer;
