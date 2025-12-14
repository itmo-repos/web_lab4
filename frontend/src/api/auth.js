import axios from 'axios';

// базовый экземпляр axios с базовым URL
const api = axios.create({
  baseURL: 'api/', // поменяй на свой бэкенд
  headers: {
    'Content-Type': 'application/json',
  },
});

// авторизация (логин)
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data; // токены, пользователь и т.д.
  } catch (err) {
    throw err.response?.data || { message: 'Ошибка на сервере' };
  }
};

// регистрация
export const register = async (registerData) => {
  try {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  } catch (err) {
    throw err.response.data || { message: 'Ошибка на сервере' };
  }
};

export default api;
