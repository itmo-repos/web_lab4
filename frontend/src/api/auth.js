import { api } from '.'
import { normalizeApiError } from './apiError';

export const apiLogin = async (loginData) => {
  try {
    const { data } = await api.post('/auth/login', loginData);
    return { data };
  } catch (err) {
    throw normalizeApiError(err);
  }
};

// регистрация
export async function apiRegister(registerData) {
  try {
    const { data } = await api.post('/auth/register', registerData);
    return { data };
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function apiLogout() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw { error: 'Нет refresh токена' };
    }

    const { data } = await api.post('/auth/logout', { refreshToken });
    return { data };
  } catch (err) {
    throw normalizeApiError(err);
  }
}

export async function apiRefresh() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw { error: 'Нет refresh токена' };
    }

    const { data } = await api.post('/auth/refresh', { refreshToken });

    return {
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    };
  } catch (err) {
    throw normalizeApiError(err);
  }
}

