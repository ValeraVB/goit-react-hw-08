import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Устанавливаем базовый URL
axios.defaults.baseURL = "https://connections-api.goit.global/";

// Устанавливаем заголовок авторизации
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Очищаем заголовок авторизации
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 *
 * После успешной регистрации добавляем токен в заголовок
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 *
 * После успешного входа добавляем токен в заголовок
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", userInfo);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * Заголовок: Authorization: Bearer token
 *
 * После успешного выхода очищаем токен из заголовка
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * Заголовок: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);

/*
 * GET @ /contacts
 * Заголовок: Authorization: Bearer token
 * Получение всех контактов
 */
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /contacts
 * Заголовок: Authorization: Bearer token
 * body: { name, number }
 * Создание нового контакта
 */
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * DELETE @ /contacts/{contactId}
 * Заголовок: Authorization: Bearer token
 * Удаление контакта по ID
 */
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId; // Возвращаем ID контакта, чтобы удалить его из состояния
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * PATCH @ /contacts/{contactId}
 * Заголовок: Authorization: Bearer token
 * body: { name, number }
 * Обновление контакта по ID
 */
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, updatedContact }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/contacts/${contactId}`,
        updatedContact
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
