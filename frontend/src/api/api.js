import { secureApiRequest } from "./secureApiRequest";


export async function addPoint(auth, x, y, r) {
  return secureApiRequest(auth, 'post', '/points/add-new', { x, y, r });
}

export async function getAllPoints(auth) {
  return secureApiRequest(auth, 'get', '/points/get-all');
}

export async function clearAllPoints(auth) {
  return secureApiRequest(auth, 'delete', '/points/clear-all');
}
