// Config de Jest usada SÓ pela demo de mutation testing (Stryker).
// Escopa a suíte aos testes de lógica pura (store + utils) — assim o Stryker
// roda mesmo com os outros testes (MovieCard, api, popularMovies) ainda em scaffold.
const base = require('./package.json').jest;

module.exports = {
  ...base,
  testMatch: [
    '**/__tests__/favoritesStore.test.ts',
    '**/__tests__/counterStore.test.ts',
    '**/__tests__/posterUrl.test.ts',
  ],
};
