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

// Экспорт селектора
export const selectNameFilter = (state) => state.filters.filter; // Убедитесь, что здесь всё корректно

export default filtersSlice.reducer; // Экспорт редюсера по умолчанию
