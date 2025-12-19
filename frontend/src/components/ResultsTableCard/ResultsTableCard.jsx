import { useEffect, useState } from 'react';
import './ResultsTableCard.css';

import { useAtomValue } from 'jotai';
import { pointsAtom } from '../../atoms/points';



export function ResultsTableCard() {

    const points = useAtomValue(pointsAtom);

  return (
    <div className="results-card-container">
      <div className="results-card">
        <h2>Результаты проверок</h2>

        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Hit</th>
              </tr>
            </thead>
            <tbody>
              {points.map((row, i) => (
                <tr key={i}>
                  <td>{Number(row.x).toFixed(2)}</td>
                  <td>{Number(row.y).toFixed(2)}</td>
                  <td>{Number(row.r).toFixed(2)}</td>
                  <td className={row.hit ? 'hit' : 'miss'}>
                    {row.hit ? 'True' : 'False'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
