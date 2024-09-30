import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Установим базовый URL для Axios
axios.defaults.baseURL = "https://connections-api.goit.global";

// Регистрация пользователя
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userData); // API требует name, email, password
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Авторизация пользователя
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", userData); // API требует email, password
      return response.data; // Возвращаем данные пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Логаут пользователя
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Обновление текущего пользователя по токену
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // Устанавливаем заголовок авторизации
      axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
      const { data } = await axios.get("/users/current");
      return data; // Возвращаем данные текущего пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Получение всех контактов
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data; // Возвращаем список контактов
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Добавление нового контакта
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contactData); // API требует name, number
      return response.data; // Возвращаем данные нового контакта
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Удаление контакта
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

// Обновление контакта
export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ contactId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${contactId}`, updatedData); // API требует name и number
      return response.data; // Возвращаем обновленные данные контакта
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
