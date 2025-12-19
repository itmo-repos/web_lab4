import './GraphCard.css';

import { useAtomValue, useSetAtom } from 'jotai';
import { addPointAtom, pointsAtom, rAtom } from '../../atoms/points';
import { useRef } from 'react';
import { useAuth } from '../AuthContext/AuthContext';

function checkHit(x, y, r) {
    const h = r / 2;
    if (x < 0 && y > 0) return false;
    if (x >= 0 && y >= 0) return x*x + y*y <= h*h;
    if (x <= 0 && y <= 0) return -y <= h && -x <= r;
    return -y <= h - x;
}

export function GraphCard() {
  const svgRef = useRef(null);
  const auth = useAuth();

  const points = useAtomValue(pointsAtom);
  const r = useAtomValue(rAtom);

  const addPoint = useSetAtom(addPointAtom);


  const handleClick = async (e) => {
    if (!r) {
      return;
    }

    const svg = svgRef.current;
    const pt = new DOMPoint(e.clientX, e.clientY);
    const ctm = svg.getScreenCTM();

    if (!ctm) return;

    const svgPoint = pt.matrixTransform(ctm.inverse());

    const x = (svgPoint.x - 150) / 120 * r;
    const y = (150 - svgPoint.y) / 120 * r;

    addPoint({ auth, x, y, r });
  };

  return (
    <div className="graph-card">
      <div className="graph-container">
        <svg
          ref={svgRef}
          width="800"
          height="800"
          viewBox="-25 -25 350 350"
          className="svg-chart"
          onClick={handleClick}
        >
          <path d="M 150 150 L 150 90 A 60 60 0 0 1 210 150 L 150 150" className="graph-body" />
          <rect x="30" y="150" width="120" height="60" className="graph-body"/>
          <polygon points="150,150 150,210 210,150" className="graph-body"/>

          <line x1="150" y1="300" x2="150" y2="0" stroke="black"/>
          <line x1="145" y1="10" x2="150" y2="0" stroke="black"/>
          <line x1="155" y1="10" x2="150" y2="0" stroke="black"/>

          <line x1="155" y1="270" x2="145" y2="270" stroke="black"/>
          <line x1="155" y1="210" x2="145" y2="210" stroke="black"/>
          <line x1="155" y1="90" x2="145" y2="90" stroke="black"/>
          <line x1="155" y1="30" x2="145" y2="30" stroke="black"/>

          <text x="158" y="30" className="y-axis-label">R</text>
          <text x="158" y="90" className="y-axis-label">R/2</text>
          <text x="158" y="210" className="y-axis-label">-R/2</text>
          <text x="158" y="270" className="y-axis-label">-R</text>

          <line x1="0" y1="150" x2="300" y2="150" stroke="black"/>
          <line x1="290" y1="155" x2="300" y2="150" stroke="black"/>
          <line x1="290" y1="145" x2="300" y2="150" stroke="black"/>

          <line x1="270" y1="155" x2="270" y2="145" stroke="black"/>
          <line x1="210" y1="155" x2="210" y2="145" stroke="black"/>
          <line x1="90" y1="155" x2="90" y2="145" stroke="black"/>
          <line x1="30" y1="155" x2="30" y2="145" stroke="black"/>

          <text x="30" y="142" className="x-axis-label">-R</text>
          <text x="90" y="142" className="x-axis-label">-R/2</text>
          <text x="210" y="142" className="x-axis-label">R/2</text>
          <text x="270" y="142" className="x-axis-label">R</text>

          <text x="290" y="140" className="axis-label">x</text>
          <text x="160" y="10" className="axis-label">y</text>

          {r > 0 && points.map((p, i) => (
            <circle
              key={i}
              cx={p.x / r * 120 + 150}
              cy={150 - p.y / r * 120}
              r="2"
              className={checkHit(p.x, p.y, r)  ? 'point-hit' : 'point-miss'}
            />
          ))}

        </svg>
      </div>
    </div>
  );
}
