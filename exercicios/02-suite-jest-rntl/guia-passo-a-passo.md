# Guia passo a passo — Atividade 2 (Suíte Unitária RN)

> Manual prático ~1-2h. Você escreve testes Jest sobre o app que já vem pronto. Sem simulador, sem token, sem rede.

---

## 1. Setup (~10min)

```bash
# Fork no GitHub, depois clone o SEU fork:
git clone https://github.com/SEU-USUARIO/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile/exercicios/02-suite-jest-rntl/pratica

node -v        # precisa v22.x  (use nvm: nvm install 22 && nvm use 22)
npm install    # ~2-3min na primeira vez
npm test       # posterUrl passa verde (3 testes); o resto aparece como "todo"
```

Saída esperada:

```
PASS  __tests__/posterUrl.test.ts
Tests:  3 passed, 12 failed, 7 todo, 22 total
```

> **Vermelho é esperado no começo.** Os testes fáceis já vêm com Arrange/Act prontos — você completa só o `expect` pra virar verde. Os 🔴 desafios estão como `todo` (escreva o teste inteiro a partir da dica).

---

## 2. Anatomia de um teste (modelo `posterUrl.test.ts`)

```typescript
import { posterUrl } from '../src/utils/poster-url';

describe('posterUrl', () => {           // agrupa
  it('monta URL com size default', () => {   // 1 caso
    expect(posterUrl('/a.jpg')).toBe('https://image.tmdb.org/t/p/w342/a.jpg');
  });
});
```

`describe` agrupa · `it`/`test` é um caso · `expect(x).toBe(y)` é o oráculo.

---

## 3. Testando store Zustand (`favoritesStore.test.ts`)

Store é **singleton** — sem reset, um teste vaza pro outro. O scaffold já tem o `beforeEach`:

```typescript
import { useFavoritesStore } from '../src/store/favoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });   // reset entre testes
});

const s = () => useFavoritesStore.getState();   // atalho

it('add(id) adiciona o id', () => {
  s().add(1);
  expect(s().ids).toEqual([1]);
});

it('toggle remove se já existe', () => {
  s().add(1);
  s().toggle(1);
  expect(s().ids).toEqual([]);
});
```

`getState()` lê estado e actions fora de componente React.

---

## 4. Testando função pura (`api.test.ts`)

`isTokenError` é função pura — passe objetos de erro, verifique o booleano:

```typescript
import { isTokenError } from '../src/services/api';

it('true pra 401', () => {
  expect(isTokenError({ response: { status: 401 } })).toBe(true);
});
it('false pra null', () => {
  expect(isTokenError(null)).toBe(false);
});
```

---

## 5. Teste de tela — RNTL (`MovieCard.test.tsx`) ⭐

O teste mais "cara de QA": valida o que o usuário **vê** e **faz**. MovieCard usa `useNavigation()` → mocke o hook (não há `NavigationContainer` no teste).

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import MovieCard from '../src/components/MovieCard';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const movie = { id: 42, title: 'Matrix', poster_path: '/m.jpg', vote_average: 8.7 };

it('mostra título e nota', () => {
  render(<MovieCard movie={movie} />);
  expect(screen.getByText('Matrix')).toBeTruthy();
  expect(screen.getByText('⭐ 8.7')).toBeTruthy();
});

it('navega pro detalhe ao tocar', () => {
  render(<MovieCard movie={movie} />);
  fireEvent.press(screen.getByText('Matrix'));
  expect(mockNavigate).toHaveBeenCalledWith('Detail', { id: 42, title: 'Matrix' });
});
```

`screen.getByText` = o que aparece · `fireEvent.press` = o toque.

---

## 6. Cobertura

```bash
npm run test:coverage
open coverage/lcov-report/index.html   # macOS  (Linux: xdg-open)
```

Meta: **≥ 70%** em `src/store` e `src/utils`. Vermelho no relatório = linha não executada por teste.

---

## 7. Bônus — mock de dependência (`popularMovies.test.ts`)

```typescript
import { fetchPopularMovies } from '../src/queries/movies/get-popular-movies';
import { api } from '../src/services/api';

jest.mock('@/services/api');               // troca o módulo real por mock
const mockedGet = api.get as jest.Mock;

it('chama /movie/popular e devolve data', async () => {
  mockedGet.mockResolvedValue({ data: { page: 1, results: [] } });
  const out = await fetchPopularMovies(1);
  expect(mockedGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 1 } });
  expect(out.page).toBe(1);
});
```

---

## Troubleshooting

| Erro | Causa | Fix |
|---|---|---|
| `Cannot find module 'zustand'` | esqueceu `npm install` | rode `npm install` |
| testes passam isolados, falham juntos | store não resetada | `setState` no `beforeEach` |
| cobertura 100% mas "não testei nada" | teste sem `expect` | todo `it` precisa de ao menos 1 assert |
| `Couldn't find a navigation object` no MovieCard | faltou mockar `useNavigation` | adicione o `jest.mock('@react-navigation/native', ...)` |
| `npm install` falha / pacote não encontrado | registry errado | o `.npmrc` do projeto já aponta pro npm público; rode na raiz do `pratica` |

---

## Entrega

```bash
git checkout -b entrega/atividade-2-seu-nome
git add exercicios/02-suite-jest-rntl/pratica/__tests__
git commit -m "test(atv2): suite unitaria favoritesStore + counterStore + api"
git push origin entrega/atividade-2-seu-nome
```

> **NUNCA** comite `node_modules/` nem `coverage/` — o `.gitignore` já cuida. Submeta o link do commit/PR no Canvas.
