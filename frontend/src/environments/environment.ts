export const environment = {
  apiUrl: ((globalThis as unknown as { __env?: { API_URL?: string } }).__env?.API_URL ||
    'http://localhost:5000') as string,
};


