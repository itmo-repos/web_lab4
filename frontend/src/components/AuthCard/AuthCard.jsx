import React, { useState } from 'react';
import './AuthCard.css';

import { login, register } from '../../api/auth';


export function AuthCard() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleLogin = async () => {
    setError('');
    setSuccess('');
    try {
      const data = await login({ username: loginValue, password: passwordValue });
      console.log('Успешный логин:', data);
      // тут можно сохранять токен в localStorage или context
    } catch (err) {
      setError(err.message || 'Ошибка при входе');
    }
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    try {
      const data = await register({ username: loginValue, password: passwordValue });
      console.log('Успешная регистрация:', data);
      setSuccess('Успешно! Попробуйте авторизоваться');
    } catch (err) {
      setError(err.message || 'Ошибка при регистрации');
    }
  };

  return (
    <div className="auth-card-container">
      <div className="auth-card">
        <h2>Вход в систему</h2>

        <input type="text" placeholder="Логин" className="auth-input" onChange={e => setLoginValue(e.target.value)} required />
        <input type="password" placeholder="Пароль" className="auth-input" onChange={e => setPasswordValue(e.target.value)} required />

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
