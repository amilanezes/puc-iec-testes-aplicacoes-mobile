// __tests__/unit/06-popularMovies.test.ts
//
// BÔNUS (camada data) — testar fetchPopularMovies isolando a dependência de rede.
//
// jest.mock('@/services/api') troca o módulo real por um mock automático.
// Aí você controla o que api.get retorna e verifica como foi chamado.
//
//   const mockedGet = api.get as jest.Mock;
//   mockedGet.mockResolvedValue({ data: { page: 1, results: [], total_pages: 1, total_results: 0 } });

import { fetchPopularMovies } from '@/queries/movies/get-popular-movies';
import { api } from '@/services/api';

jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

beforeEach(() => {
  mockedGet.mockReset();
});

describe('fetchPopularMovies', () => {
  it.todo('1. chama /movie/popular com a page informada');
  it.todo('2. devolve o data da resposta');
});
