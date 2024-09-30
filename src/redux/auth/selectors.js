// Селектор для проверки, авторизован ли пользователь
export const selectIsLoggedIn = (state) => Boolean(state.auth.isLoggedIn);

// Селектор для получения информации о пользователе
export const selectUser = (state) => state.auth.user || null;

// Селектор для получения токена авторизации
export const selectToken = (state) => state.auth.token || null;

// Селектор для проверки, находится ли пользователь в процессе обновления
export const selectIsRefreshing = (state) => Boolean(state.auth.isRefreshing);

// Селектор для получения ошибки аутентификации
export const selectAuthError = (state) => state.auth.error || null;
