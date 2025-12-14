import React from 'react';
import { addPoint, getAllPoints } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext/AuthContext';
import './MainPage.css';

export function MainPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleAddRandomPoint = async () => {
    try {
      // создаем рандомные координаты
      const x = (Math.random() * 10 - 5).toFixed(2); // -5..5
      const y = (Math.random() * 10 - 5).toFixed(2);
      const r = (Math.random() * 5 + 1).toFixed(2);  // 1..6

      await addPoint(auth, parseFloat(x), parseFloat(y), parseFloat(r));
      console.log(`Добавлена точка: x=${x}, y=${y}, r=${r}`);
    } catch (err) {
      console.error('Ошибка добавления точки:', err);
    }
  };

  const handleShowAllPoints = async () => {
    try {
      const points = await getAllPoints(auth);
      console.log('Все точки:', points);
    } catch (err) {
      console.error('Ошибка получения точек:', err);
    }
  };

  const handleLogout = () => {
    auth.destroyTokens();
    navigate('/auth');
  };

  return (
    <div className="main-page">
      <h1>Главная страница</h1>
      <p>Добро пожаловать в приложение!</p>

      <div className="main-buttons">
        <button onClick={handleAddRandomPoint}>Добавить рандомную точку</button>
        <button onClick={handleShowAllPoints}>Показать все точки (консоль)</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
