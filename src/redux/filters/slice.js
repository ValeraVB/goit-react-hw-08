import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние для слайса фильтров
const initialState = {
  filter: "",
};

// Слайс фильтров
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Экспорт редюсера для добавления в store
export const { changeFilter } = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.filter;

export default filtersSlice.reducer; // Здесь мы экспортируем редюсер по умолчанию
