// src/mocks/movies.ts
//
// Dados mockados pra E2E DETERMINÍSTICO.
//
// Por que mock e não TMDB real na Atividade 3:
//   - Flow E2E precisa ser estável (mesmo dado sempre) — sem rede, sem flaky, sem rate-limit.
//   - Aluno não precisa de token TMDB pra rodar os flows Maestro.
//   - Os testIDs e títulos são fixos → o flow pode assertVisible em "Matrix" com segurança.
//
// (Na A1/A2 o app fala com a TMDB real; aqui congelamos os dados pra focar no E2E.)

import type { Movie } from '@/types/movie';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 603,
    title: 'Matrix',
    overview:
      'Um hacker descobre que a realidade é uma simulação e se junta à rebelião contra as máquinas.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    release_date: '1999-03-31',
    vote_average: 8.2,
  },
  {
    id: 27205,
    title: 'A Origem',
    overview:
      'Um ladrão que rouba segredos através dos sonhos recebe a missão de plantar uma ideia na mente de um herdeiro.',
    poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    release_date: '2010-07-15',
    vote_average: 8.4,
  },
  {
    id: 157336,
    title: 'Interestelar',
    overview:
      'Exploradores viajam por um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-05',
    vote_average: 8.4,
  },
  {
    id: 155,
    title: 'Batman: O Cavaleiro das Trevas',
    overview:
      'Batman enfrenta o Coringa, um criminoso que mergulha Gotham no caos e na anarquia.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    release_date: '2008-07-18',
    vote_average: 8.5,
  },
  {
    id: 19995,
    title: 'Avatar',
    overview:
      'Um fuzileiro paraplégico é enviado à lua Pandora e se vê dividido entre seguir ordens e proteger um novo mundo.',
    poster_path: '/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
    release_date: '2009-12-18',
    vote_average: 7.6,
  },
  {
    id: 24428,
    title: 'Os Vingadores',
    overview:
      'Os super-heróis mais poderosos da Terra se unem para deter Loki e seu exército alienígena.',
    poster_path: '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    release_date: '2012-05-04',
    vote_average: 7.7,
  },
  {
    id: 680,
    title: 'Pulp Fiction',
    overview:
      'As vidas de dois assassinos da máfia, um boxeador e um casal de assaltantes se entrelaçam.',
    poster_path: '/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg',
    release_date: '1994-09-10',
    vote_average: 8.5,
  },
  {
    id: 13,
    title: 'Forrest Gump',
    overview:
      'A história de um homem simples que testemunha e influencia vários eventos marcantes do século XX.',
    poster_path: '/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
    release_date: '1994-07-06',
    vote_average: 8.5,
  },
  {
    id: 550,
    title: 'Clube da Luta',
    overview:
      'Um homem insone e um vendedor de sabonetes formam um clube de luta clandestino que vira algo maior.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
  },
  {
    id: 122,
    title: 'O Senhor dos Anéis: O Retorno do Rei',
    overview:
      'Gandalf e Aragorn lideram o mundo dos homens contra Sauron enquanto Frodo se aproxima da Montanha da Perdição.',
    poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    release_date: '2003-12-01',
    vote_average: 8.5,
  },
  {
    id: 11,
    title: 'Star Wars: Uma Nova Esperança',
    overview:
      'Luke Skywalker se junta a aliados improváveis para salvar a galáxia do Império e da Estrela da Morte.',
    poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
    release_date: '1977-05-25',
    vote_average: 8.2,
  },
  {
    id: 769,
    title: 'Os Bons Companheiros',
    overview:
      'A ascensão e queda de um gângster ao longo de três décadas no submundo de Nova York.',
    poster_path: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    release_date: '1990-09-12',
    vote_average: 8.5,
  },
];

// Simula latência de rede (pra ActivityIndicator aparecer brevemente).
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getPopularMoviesMock(): Promise<Movie[]> {
  await delay(300);
  return MOCK_MOVIES;
}

export async function getMovieByIdMock(id: number): Promise<Movie | undefined> {
  await delay(150);
  return MOCK_MOVIES.find((m) => m.id === id);
}

export async function searchMoviesMock(query: string): Promise<Movie[]> {
  await delay(200);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q));
}
