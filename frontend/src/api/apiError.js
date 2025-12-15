export function normalizeApiError(err) {
  if (err?.response?.data?.error) {
    return { error: err.response.data.error };
  }

  if (err?.message) {
    return { error: err.message };
  }

  return { error: 'Неизвестная ошибка сервера' };
}
