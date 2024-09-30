import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Реєстрація користувача
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userData);
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Авторизація користувача
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Логаут користувача
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Оновлення поточного користувача за токеном
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // Встановлюємо заголовок авторизації
      axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
      const { data } = await axios.get("/users/current");
      return data; // Возвращаем данные текущего пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Отримання всіх контактів
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Додавання нового контакту
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contactData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Видалення контакту
export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // Возвращаем ID удаленного контакта
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Оновлення контакту
export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ contactId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, updatedData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
