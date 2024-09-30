import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice"; // Убедитесь, что путь правильный

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Другие редюсеры, если есть
  },
});

export default store;
