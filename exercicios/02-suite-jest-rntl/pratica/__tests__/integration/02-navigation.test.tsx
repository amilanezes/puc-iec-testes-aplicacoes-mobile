// __tests__/integration/02-navigation.test.tsx
//
// PRÁTICA (não pontua) — integração de navegação.
// Renderiza o app inteiro (AppNavigator) e verifica que tocar num card
// leva pra tela de detalhe. Como a lista vem de fetch, a API é mockada.
//
// Setup já pronto. Complete o it.todo:
//   render(renderApp());
//   fireEvent.press(await screen.findByText('Matrix'));   // findBy = espera async
//   expect(await screen.findByText('Detalhes do filme')).toBeTruthy();

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { api } from '@/services/api';
import { useFavoritesStore } from '@/store/favoritesStore';
import AppNavigator from '@/integration/AppNavigator';

// Mocka a camada HTTP — a lista vem desses dados falsos (sem rede, sem token).
jest.mock('@/services/api');
const mockedGet = api.get as jest.Mock;

const movies = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    { id: 1, title: 'Matrix', overview: '', poster_path: '/m.jpg', release_date: '1999', vote_average: 8.7 },
  ],
};

// Cada teste usa um QueryClient novo (cache não vaza entre testes).
function renderApp() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={client}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
  mockedGet.mockReset();
  mockedGet.mockResolvedValue({ data: movies });
});

describe('Navegação (integração)', () => {
  it.todo('1. tap no card de Matrix navega pra tela de detalhe');
});
