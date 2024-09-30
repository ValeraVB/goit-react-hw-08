import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

// Початковий стан для слайсу контактів
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// Слайс контактів
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Можливі додаткові ред'юсери можна додати сюди, якщо це потрібно
  },
  extraReducers: (builder) => {
    builder
      // Обробка стану для fetchContacts
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Обробка стану для addContact
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Обробка стану для deleteContact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Експорт ред'юсера для додавання в store
export const contactsReducer = contactsSlice.reducer; // Виглядає правильно, але краще експортувати через default
export default contactsSlice.reducer; // Це важливо для правильного експорту
