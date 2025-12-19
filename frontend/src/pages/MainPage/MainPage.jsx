import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext/AuthContext';
import './MainPage.css';
import { GraphCard } from '../../components/GraphCard/GraphCard';
import { PointFormCard } from '../../components/PointFormCard/PointFormCard';
import { ResultsTableCard } from '../../components/ResultsTableCard/ResultsTableCard';
import { fetchPointsAtom } from '../../atoms/points';
import { useAtom } from 'jotai';

import backgroundImage from '../../assets/images/background.png';


export function MainPage() {
  const auth = useAuth();
  const [, fetchPoints] = useAtom(fetchPointsAtom);

  useEffect(() => {
    fetchPoints(auth);
  }, [auth]);

  return (
    <div className="main-background" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="main-page">
        <GraphCard/>
        <PointFormCard/>
        <ResultsTableCard/>
      </div>
    </div>
  );
}
