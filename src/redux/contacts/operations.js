import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Функція для отримання контактів
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

// Функція для додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Функція для видалення контакту
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
