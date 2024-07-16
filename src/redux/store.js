import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem } = expenseSlice.actions;

const store = configureStore({
  reducer: {
    expenses: expenseSlice.reducer,
  },
});

export default store;
