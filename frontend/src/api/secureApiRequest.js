import { api } from '.';
import { apiRefresh } from './auth';
import { normalizeApiError } from './apiError';
import {
  getRefreshPromise,
  setRefreshPromise,
  clearRefreshPromise
} from './authRefreshLock';

export async function secureApiRequest(auth, method, url, data = {}) {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: auth.accessToken
        ? { Authorization: `Bearer ${auth.accessToken}` }
        : {},
    });

    return { data: response.data };

  } catch (err) {
    if (err.response?.status !== 401) {
      throw normalizeApiError(err);
    }

    if (!localStorage.getItem('refreshToken')) {
      auth.destroyTokens();
      throw { error: 'Нет refresh токена' };
    }

    let refreshPromise = getRefreshPromise();

    if (!refreshPromise) {
      refreshPromise = apiRefresh()
        .then(({ data }) => {
          auth.saveTokens(data.accessToken, data.refreshToken);
          return data.accessToken;
        })
        .finally(() => {
          clearRefreshPromise();
        });

      setRefreshPromise(refreshPromise);
    }

    let newAccess;
    try {
      newAccess = await refreshPromise;
    } catch {
      auth.destroyTokens();
      throw { error: 'Refresh не удался' };
    }

    try {
      const retryResponse = await api({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${newAccess}` },
      });

      return { data: retryResponse.data };
    } catch (retryErr) {
      throw normalizeApiError(retryErr);
    }
  }
}
