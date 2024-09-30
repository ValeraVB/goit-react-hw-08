import { createSelector } from "@reduxjs/toolkit";

// Базовий селектор для доступу до стану контактів
export const selectContacts = (state) => state.contacts.items;

// Селектор для отримання статусу завантаження
export const selectIsLoading = (state) => state.contacts.isLoading;

// Селектор для отримання помилки
export const selectError = (state) => state.contacts.error;

// Селектор для доступу до фільтру (якщо є фільтр для пошуку)
export const selectFilter = (state) => state.filters.name;

// Мемоізований селектор для відфільтрованих контактів
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
