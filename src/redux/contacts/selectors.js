import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectFilter = (state) => state.filters.filter || "";

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
        contact.number.toString().toLowerCase().includes(normalizedFilter);

      return hasName || hasNumber;
    });
  }
);
