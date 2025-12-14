import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRefresh } from '../../api/auth';
import {
  getRefreshPromise,
  setRefreshPromise,
  clearRefreshPromise
} from '../../api/authRefreshLock';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('refreshToken') ? "TEMP_TOKEN" : null);

  const saveTokens = (access, refresh) => {
    setAccessToken(access);
    localStorage.setItem('refreshToken', refresh);
  };

  const destroyTokens = () => {
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    async function refreshAccessToken() {
      const refresh = localStorage.getItem('refreshToken');
      if (!refresh) return;

      try {
        let refreshPromise = getRefreshPromise();
        
        if (!refreshPromise) {
          refreshPromise = apiRefresh()
            .then(tokens => {
              saveTokens(tokens.accessToken, tokens.refreshToken);
            })
            .finally(() => {
              clearRefreshPromise();
            });
    
          setRefreshPromise(refreshPromise);
        }
  
        await refreshPromise;
      } catch (e) {
        console.error('Не удалось обновить токен', e);
        destroyTokens();
      }
    }

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        saveTokens,
        destroyTokens,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
