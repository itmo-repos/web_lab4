import React, { useState, useEffect } from 'react';
import './AuthCard.css';

import { apiLogin, apiRegister } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

export function AuthCard() {
  const { saveTokens, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
        if (isAuthenticated) {
            navigate('/main');
        }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    try {
      const data = await apiLogin({ username: loginValue, password: passwordValue });
      saveTokens(data.accessToken, data.refreshToken);
      navigate('/main');
    } catch (err) {
      setError(err.error);
    }
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    try {
      const data = await apiRegister({ username: loginValue, password: passwordValue });
      setSuccess('Успешно! Попробуйте авторизоваться');
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <div className="auth-card-container">
      <div className="auth-card">
        <h2>Вход в систему</h2>

        <input type="text" placeholder="Логин" className="auth-input" onChange={e => setLoginValue(e.target.value)} maxLength={50} required />
        <input type="password" placeholder="Пароль" className="auth-input" onChange={e => setPasswordValue(e.target.value)} maxLength={50} required />

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <div className="auth-buttons">
          <button className="auth-btn" onClick={handleRegister}>Регистрация</button>
          <button className="auth-btn primary" onClick={handleLogin}>Войти</button>
        </div>
      </div>
    </div>
  );
}
