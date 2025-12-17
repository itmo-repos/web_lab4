import React, { useState, useEffect } from 'react';
import './AuthCard.css';

import { apiLogin, apiRegister } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const MIN_LEN = 5;
const MAX_LEN = 50;

function validate(login, password) {
  if (login.length < MIN_LEN) {
    return `Логин должен быть минимум ${MIN_LEN} символов`;
  }

  if (login.length > MAX_LEN) {
    return `Логин должен быть не больше ${MAX_LEN} символов`;
  }

  if (password.length < MIN_LEN) {
    return `Пароль должен быть минимум ${MIN_LEN} символов`;
  }

  if (password.length > MAX_LEN) {
    return `Пароль должен быть не больше ${MAX_LEN} символов`;
  }

  return null;
}

export function AuthCard() {
  const { saveTokens, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(0);


  useEffect(() => {
        if (isAuthenticated) {
            navigate('/main');
        }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(1);

    const validationError = validate(loginValue, passwordValue);
    if (validationError) {
      setError(validationError);
      setIsLoading(0);
      return;
    }

    try {
      const { data } = await apiLogin({ username: loginValue, password: passwordValue });
      saveTokens(data.accessToken, data.refreshToken);
      navigate('/main');
    } catch (err) {
      setError(err.error);
      setSuccess('');
    } finally {
      setIsLoading(0);
    }
  };

  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(2);

    const validationError = validate(loginValue, passwordValue);
    if (validationError) {
      setError(validationError);
      setIsLoading(0);
      return;
    }
    
    try {
      await apiRegister({ username: loginValue, password: passwordValue });
      setSuccess('Успешно! Попробуйте авторизоваться');
      setError('');
    } catch (err) {
      setError(err.error);
      setSuccess('');
    } finally {
      setIsLoading(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась
    handleLogin();
  };

  return (
    <div className="auth-card-container">
      <div className="auth-card">
        <h2>Вход в систему</h2>

        <form onSubmit={handleSubmit}>
          <input id="login" 
                type="text" 
                placeholder="Логин" 
                className="auth-input"
                onChange={e => setLoginValue(e.target.value)} 
                required 
                />

          <input id="password" 
                type="password" 
                placeholder="Пароль" 
                className="auth-input" 
                onChange={e => setPasswordValue(e.target.value)}
                required 
                />

          <div className={`auth-message ${error || success ? 'show' : ''}`}>
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}
          </div>

          <div className="auth-buttons">
            <button className="auth-btn" onClick={handleRegister} disabled={isLoading}>{isLoading == 2 ? 'Загрузка…' : 'Регистрация'}</button>
            <button className="auth-btn primary" onClick={handleLogin} disabled={isLoading}>{isLoading == 1 ? 'Загрузка…' : 'Войти'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
