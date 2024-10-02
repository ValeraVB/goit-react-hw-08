import { createSelector } from "@reduxjs/toolkit";

// Селектор для получения всех контактов
export const selectContacts = (state) => state.contacts.items;

// Селектор для получения статуса загрузки
export const selectIsLoading = (state) => state.contacts.isLoading;

// Селектор для получения ошибки
export const selectError = (state) => state.contacts.error;

// Селектор для фильтра
export const selectFilter = (state) => state.filters.filter || "";

// Селектор для получения отфильтрованных контактов
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) => {
      const hasName =
        contact.name && contact.name.toLowerCase().includes(normalizedFilter);
      const hasNumber =
        contact.number &&
        contact.number.toString().toLowerCase().includes(normalizedFilter); // Используем поле 'number' вместо 'phone'

      return hasName || hasNumber;
    });
  }
);
