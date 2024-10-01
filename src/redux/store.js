import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contacts/slice"; // Редюсер для контактов
import filtersReducer from "./filters/slice"; // Редюсер для фильтров
import authReducer from "./auth/slice"; // Редюсер для аутентификации

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token"], // Данные, которые будут храниться в хранилище
  },
  authReducer
);

// Настройка Redux Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer, // Редюсер для контактов
    filters: filtersReducer, // Добавьте редюсер для фильтров
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Игнорируем действия, связанные с сериализацией
      },
    }),
});

// Создание persistor для Redux Persist
export const persistor = persistStore(store);
