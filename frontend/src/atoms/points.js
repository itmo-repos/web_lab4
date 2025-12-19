import { atom } from 'jotai';
import { addPoint, getAllPoints, clearAllPoints } from '../api/api';

export const rAtom = atom(null); 
export const pointsAtom = atom([]);

export const pointsLoadingAtom = atom(false);
export const pointsErrorAtom = atom(null);


export const fetchPointsAtom = atom(
  null,
  async (get, set, auth) => {
    set(pointsLoadingAtom, true);
    set(pointsErrorAtom, null);
    try {
      const { data } = await getAllPoints(auth);
      set(pointsAtom, data);
    } catch (e) {
      set(pointsErrorAtom, 'Не удалось загрузить точки');
    } finally {
      set(pointsLoadingAtom, false);
    }
  }
);

export const addPointAtom = atom(
  null,
  async (get, set, { auth, x, y, r }) => {
    await addPoint(auth, x, y, r);
    await set(fetchPointsAtom, auth);
  }
);

export const clearPointsAtom = atom(
  null,
  async (get, set, auth) => {
    await clearAllPoints(auth);
    await set(fetchPointsAtom, auth);
  }
);
