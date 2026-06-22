// src/services/api.ts
//
// Cliente HTTP da TMDB. Igual ao da Atividade 2.
//
// O app funciona em DOIS modos:
//   - SEM token  → usa dados MOCKADOS (src/mocks/movies.ts) — setup zero, E2E determinístico
//   - COM token  → busca da TMDB real (configure EXPO_PUBLIC_TMDB_TOKEN no .env)
//
// Token TMDB: gerar em https://www.themoviedb.org/settings/api

import axios from 'axios';

const TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

// Detecta token ausente, vazio, placeholder ou dummy.
export const isTokenMissing = (() => {
  if (!TOKEN) return true;
  const t = TOKEN.trim();
  if (t.length < 20) return true;
  if (t === 'cole_seu_token_aqui') return true;
  if (t.startsWith('dummy')) return true;
  return false;
})();

const isV4Token = TOKEN ? TOKEN.startsWith('eyJ') : false;

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const baseParams = { language: 'pt-BR', ...(config.params || {}) };
  if (isV4Token) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
    config.params = baseParams;
  } else {
    config.params = { ...baseParams, api_key: TOKEN };
  }
  return config;
});
