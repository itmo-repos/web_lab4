let refreshPromise = null;

export function getRefreshPromise() {
  return refreshPromise;
}

export function setRefreshPromise(promise) {
  refreshPromise = promise;
}

export function clearRefreshPromise() {
  refreshPromise = null;
}
