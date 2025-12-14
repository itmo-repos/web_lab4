import { api } from '.';
import { apiRefresh } from './auth';
import {
  getRefreshPromise,
  setRefreshPromise,
  clearRefreshPromise
} from './authRefreshLock';

export async function secureApiRequest(auth, method, url, data = {}) {
  try {
    return (await api({
      method,
      url,
      data,
      headers: auth.accessToken
        ? { Authorization: `Bearer ${auth.accessToken}` }
        : {},
    })).data;

  } catch (err) {
    if (err.response?.status !== 401) {
      throw err.response?.data || err;
    }

    if (!localStorage.getItem('refreshToken')) {
      auth.destroyTokens();
      throw new Error('Нет refresh токена');
    }

    let refreshPromise = getRefreshPromise();

    if (!refreshPromise) {
      refreshPromise = apiRefresh()
        .then(tokens => {
          auth.saveTokens(tokens.accessToken, tokens.refreshToken);
          return tokens.accessToken;
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
      throw new Error('Refresh не удался');
    }

    try {
      return (await api({
        method,
        url,
        data,
        headers: { Authorization: `Bearer ${newAccess}` },
      })).data;
    } catch (retryErr) {
      throw retryErr.response?.data || retryErr;
    }
  }
}
