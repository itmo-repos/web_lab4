import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import './PointFormCard.css';
import { addPointAtom, rAtom } from '../../atoms/points';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { apiLogout } from '../../api/auth';

export function PointFormCard() {
  const [x, setX] = useState(null);
  const [y, setY] = useState('');
  const [r, setR] = useAtom(rAtom);
  const [error, setError] = useState('');

  const addPoint = useSetAtom(addPointAtom);


  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    apiLogout();
    auth.destroyTokens();
    navigate('/auth');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (y.indexOf('.') != -1 && y.split('.')[1].length > 10) {
      setError('Точность Y не больше 10 знаков');
      return;
    }

    const yNum = parseFloat(y);

    if (x === null) {
      setError('Выберите координату X');
      return;
    }
    if (isNaN(yNum) || yNum < -5 || yNum > 3) {
      setError('Координата Y должна быть числом от -5 до 3');
      return;
    }
    if (r === null || r <= 0) {
      setError('Выберите положительный радиус R');
      return;
    }

    addPoint({ auth, x, y, r });
  };

  return (
    <div className="point-card-container">
      <div className="point-card">
        <h2>Задание точки</h2>
        <form className="point-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>X:</label>
            <div className="button-group">
              {[-4,-3,-2,-1,0,1,2,3,4].map((val) => (
                <button
                  type="button"
                  key={val}
                  className={`point-btn ${x === val ? 'selected' : ''}`}
                  onClick={() => setX(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="field-group">
            <label>Y (-5 … 3):</label>
            <input
              type="text"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="point-input"
              placeholder="Введите Y"
            />
          </div>

          <div className="field-group">
            <label>R:</label>
            <div className="button-group">
              {[-4,-3,-2,-1,0,1,2,3,4].map((val) => (
                <button
                  type="button"
                  key={val}
                  className={`point-btn ${r === val ? 'selected' : ''}`}
                  onClick={() => setR(val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit}>Отправить</button>
          <button type="button" className="logout-btn" onClick={handleLogout}> Выйти из аккаунта </button>


          <div className={`error-msg ${error ? 'show' : ''}`}>{error}</div>
        </form>
      </div>
    </div>
  );
}
