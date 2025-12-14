import { api } from '.'

export const apiLogin = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (err) {
    throw err.response.data || { message: 'Ошибка на сервере' };
  }
};

// регистрация
export const apiRegister = async (registerData) => {
  try {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  } catch (err) {
    throw err.response.data || { message: 'Ошибка на сервере' };
  }
};

export const apiLogout = async () => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      const response = await api.post('/auth/logout', { refreshToken:refresh });
      return response.data;
    }
  } catch (err) {
    throw err.response.data || { message: 'Ошибка на сервере' };
  }
};

export const apiRefresh = async () => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      const response = await api.post('/auth/refresh', { refreshToken:refresh });
      return {accessToken:response.data.accessToken, refreshToken:response.data.refreshToken};
    }
  } catch (err) {
    throw err.response.data || { message: 'Ошибка на сервере' };
  }
};


