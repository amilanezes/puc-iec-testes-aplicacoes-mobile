// __tests__/unit/02-isTokenError.test.ts
//
// HANDS-ON (camada data) — testar a lógica pura do módulo de API.
//
// isTokenError(error) classifica se um erro é de autenticação:
//   - true  se error.isTokenError === true
//   - true  se error.response.status === 401
//   - true  se error.message começa com 'TMDB_TOKEN_MISSING'
//   - false pra null/undefined/erro genérico
//
// Não precisa de rede nem mock de axios — é função pura sobre o objeto de erro.
// Os 5 são FÁCEIS e começam vermelhos → preencha o toBe() pra virar verde.

import { isTokenError } from '@/services/api';

describe('isTokenError', () => {
  it('1. retorna true pra erro com response.status 401', () => {
    expect(isTokenError({ response: { status: 401 } })).toBe(/* TODO: true ou false? */);
  });

  it('2. retorna true pra erro com flag isTokenError', () => {
    expect(isTokenError({ isTokenError: true })).toBe(/* TODO */);
  });

  it('3. retorna true pra erro TMDB_TOKEN_MISSING', () => {
    expect(isTokenError(new Error('TMDB_TOKEN_MISSING: configure o token'))).toBe(/* TODO */);
  });

  it('4. retorna false pra null', () => {
    expect(isTokenError(null)).toBe(/* TODO */);
  });

  it('5. retorna false pra erro genérico (status 500)', () => {
    expect(isTokenError({ response: { status: 500 } })).toBe(/* TODO */);
  });
});
