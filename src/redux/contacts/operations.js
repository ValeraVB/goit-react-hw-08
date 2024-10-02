import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast"; // Импортируем toast

// Операция получения всех контактов
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Операция добавления контакта
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      toast.success(`Contact "${newContact.name}" added successfully!`); // Уведомление с именем контакта
      return response.data;
    } catch (error) {
      toast.error(`Failed to add contact "${newContact.name}"`); // Уведомление об ошибке с именем контакта
      return rejectWithValue(error.message);
    }
  }
);

// Операция удаления контакта
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue, getState }) => {
    try {
      // Найдем контакт по id из состояния перед удалением
      const { contacts } = getState();
      const contactToDelete = contacts.items.find(
        (contact) => contact.id === contactId
      );

      if (!contactToDelete) {
        throw new Error("Contact not found");
      }

      await axios.delete(`/contacts/${contactId}`);
      toast.success(
        `Contact "${contactToDelete.name}" has been deleted successfully!`
      ); // Уведомление с именем контакта
      return contactId;
    } catch (error) {
      // Обработка случая, когда `contactToDelete` не был найден
      const contactName =
        getState().contacts.items.find((contact) => contact.id === contactId)
          ?.name || ""; // Если не найдено, присвоим пустую строку

      toast.error(`Failed to delete contact "${contactName}"`); // Уведомление об ошибке
      return rejectWithValue(error.message);
    }
  }
);

// Операция обновления контакта
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, updatedData);
      toast.success(`Contact "${updatedData.name}" updated successfully!`);
      return response.data;
    } catch (error) {
      toast.error(`Failed to update contact "${updatedData.name}"`);
      return rejectWithValue(error.message);
    }
  }
);
