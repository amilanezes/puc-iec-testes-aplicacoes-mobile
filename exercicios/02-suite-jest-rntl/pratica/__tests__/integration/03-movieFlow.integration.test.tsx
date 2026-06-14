// __tests__/integration/03-movieFlow.integration.test.tsx
//
// ⭐ ENTREGA AVALIATIVA — Atividade 2, Parte B (5 pts).
//
// Testa o FLUXO entre componentes da versão implementada (src/integration/):
// a lista busca dados (API mockada) e favoritar um card reflete no contador
// do header. Integração de verdade: store + query + componentes juntos, sem simulador.
//
// O setup abaixo (mock da API, dados falsos, wrapper com QueryClientProvider)
// JÁ ESTÁ PRONTO. Você só escreve os 3 it() — troque cada it.todo por it(...).
//
// Pontos de teste expostos pela tela:
//   testID="favorites-count"        → contador do header (texto "♥ N")
//   testID="movie-card-heart-1"     → botão de favoritar do filme id 1
//
// Dicas de query:
//   await screen.findByText('Matrix')                 // espera a lista carregar (async)
//   fireEvent.press(screen.getByTestId('movie-card-heart-1'))
//   expect(screen.getByTestId('favorites-count')).toHaveTextContent('1')

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { api } from '@/services/api';
import { useFavoritesStore } from '@/store/favoritesStore';
import AppNavigator from '@/integration/AppNavigator';

// Mocka a camada HTTP — a lista vem desses dados falsos (sem rede, sem token TMDB).
jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

const movies = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    { id: 1, title: 'Matrix', overview: '', poster_path: '/m.jpg', release_date: '1999', vote_average: 8.7 },
    { id: 2, title: 'Inception', overview: '', poster_path: '/i.jpg', release_date: '2010', vote_average: 8.8 },
  ],
};

// QueryClient novo por teste → cache não vaza entre os it().
function renderApp() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={client}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] }); // store é singleton — zere entre testes
  mockedGet.mockReset();
  mockedGet.mockResolvedValue({ data: movies });
});

describe('Fluxo de integração — lista + favoritos (ENTREGA Parte B)', () => {
  // 2 pts — render(renderApp()); depois findByText de 'Matrix' e 'Inception'.
  it.todo('1. exibe a lista de filmes retornada pela API mockada');

  // 2 pts — após carregar, contador começa em '0'; press no heart-1 → '1'.
  it.todo('2. favoritar um card incrementa o contador do header (♥ 1)');

  // 1 pt — favoritar e depois desfavoritar o mesmo card → contador volta a '0'.
  it.todo('3. desfavoritar volta o contador a 0');
});
