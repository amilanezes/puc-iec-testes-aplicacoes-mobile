// src/utils/testIDs.ts
//
// Convenção centralizada de testIDs do app (E2E Maestro — Atividade 3).
//
// Padrão: `<tela>-<elemento>-<acao?>`
//   login-email-input · movie-card-603 · movie-card-heart-603 · favorites-count
//
// Os MESMOS testIDs que você viu nos testes de integração da Atividade 2
// (movie-card-${id}, movie-card-heart-${id}, detail-screen, favorites-count)
// agora aparecem nas telas reais — a pirâmide fecha no mesmo app.
//
// Uso no app:   <Pressable testID={testIDs.movieCard.card(movie.id)} />
// Uso no flow:  - tapOn: { id: "movie-card-603" }

export const testIDs = {
  login: {
    screen: 'login-screen',
    emailInput: 'login-email-input',
    passwordInput: 'login-password-input',
    submit: 'login-submit-button',
    error: 'login-error-message',
  },

  movieList: {
    screen: 'movielist-screen',
    searchButton: 'movielist-search-button',
    favoritesButton: 'movielist-favorites-button',
    loading: 'movielist-loading',
    list: 'movielist-flatlist',
  },

  movieCard: {
    card: (id: number) => `movie-card-${id}`,
    title: (id: number) => `movie-card-title-${id}`,
    heart: (id: number) => `movie-card-heart-${id}`,
  },

  movieDetail: {
    screen: 'detail-screen',
    back: 'detail-back-button',
    title: 'detail-title',
    favoriteButton: 'detail-favorite-button',
  },

  search: {
    screen: 'search-screen',
    input: 'search-input',
    clear: 'search-clear-button',
    result: (id: number) => `search-result-${id}`,
    empty: 'search-empty',
  },

  favorites: {
    screen: 'favorites-screen',
    count: 'favorites-count',
    item: (id: number) => `favorites-item-${id}`,
    removeItem: (id: number) => `favorites-item-${id}-remove`,
    empty: 'favorites-empty',
  },
} as const;

export type TestIDs = typeof testIDs;
